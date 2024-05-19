class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :update, :destroy]

  def index
    res = initialize_response_data

    # 今日・今週・今月・今年・全期間のデータ
    sales_data = fetch_sales_data
    populate_sales_data(res, sales_data)

    # # WeeklyChartのデータ
    res[:weekly_chart_data] = fetch_weekly_chart_data

    # # 今年の月別売上データ
    res[:monthly_sales_this_year] = fetch_monthly_sales_this_year

    # # 年単位の売上データ
    res[:yearly_sales] = fetch_yearly_sales

    # # 曜日別来店数のデータ（今年、全期間）
    res[:visits_by_day] = fetch_visits_by_day

    # # Menuratio、Genderratio、Ageratioのデータ（今月、今年、全期間）
    populate_ratio_data(res)

    render json: res
  end

  def show
    if @sale
      render json: @sale, include: :selected_menus
    else
      head :no_content
    end
  end

  def create
    sale = Sale.new(sale_params)

    sale.transaction do
      if sale.save
        create_selected_menus(sale)
        render json: sale, status: :created
      else
        render json: { errors: sale.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => error
    render json: { "errors": error.record.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    @sale.transaction do
      if @sale.update(sale_params)
        update_selected_menus(@sale)
        render json: @sale
      else
        render json: { errors: @sale.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => error
    render json: { "errors": error.record.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @sale.destroy
    head :no_content
  end

  private
    def set_sale
      @sale = Sale.find_by(google_calendar_id: params[:id])
    end

    def sale_params
      params.require(:sale).permit(:age_group_id, :google_calendar_id, :gender, :total_price)
    end

    def selected_menu_params
      params.require(:sale).permit(menus: [:id, :price])
    end

    def create_selected_menus(sale)
      selected_menu_params[:menus].each do |menu|
        sale.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
      end
    end

    def update_selected_menus(sale)
      sale.selected_menus.destroy_all
      selected_menu_params[:menus].each do |menu|
        sale.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
      end
    end

    def initialize_response_data
      {
        today_data: { title: "Today" },
        this_week_data: { title: "This Week" },
        this_month_data: { title: "This Month" },
        this_year_data: { title: "This Year" },
        all_time_data: { title: "All Time" },
        weekly_chart_data: [],
        monthly_sales_this_year: [],
        yearly_sales: [],
        visits_by_day: { this_year: [], all_time: [] },
        menu_ratio: { this_month: [], this_year: [], all_time: [] },
        gender_ratio: { this_month: [], this_year: [], all_time: [] },
        age_ratio: { this_month: [], this_year: [], all_time: [] }
      }
    end

    def fetch_sales_data
      {
        today: Sale.preload(:selected_menus).where(created_at: Time.zone.now.all_day),
        this_week: Sale.preload(:selected_menus).where(created_at: Time.zone.now.all_week),
        this_month: Sale.preload(:selected_menus).where(created_at: Time.zone.now.all_month),
        this_year: Sale.preload(:selected_menus).where(created_at: Time.zone.now.all_year),
        all_time: Sale.preload(:selected_menus).all
      }
    end

    def populate_sales_data(res, sales_data)
      sales_data.each do |key, sales|
        res_key = "#{key}_data".to_sym
        res[res_key] ||= {}
        res[res_key][:sales] = sales.sum { |sale| sale.selected_menus.sum(&:price) }
        res[res_key][:visits] = sales.length
      end
    end

    def fetch_weekly_chart_data
      (0..6).map do |weeks_ago|
        week_start = Time.zone.now.beginning_of_week - weeks_ago.weeks
        week_end = Time.zone.now.end_of_week - weeks_ago.weeks

        sales = Sale.preload(:selected_menus).where(created_at: week_start..week_end)

        {
          name: week_start.strftime("%m-%d"),
          visits: sales.length,
          sales: sales.sum { |sale| sale.selected_menus.sum(&:price) }
        }
      end.reverse
    end

    def fetch_monthly_sales_this_year
      (1..12).map do |month|
        start_date = Time.zone.local(Time.zone.now.year, month, 1)
        end_date = start_date.end_of_month

        sales = Sale.joins(:selected_menus).where(created_at: start_date..end_date)
        total_sales = sales.sum("selected_menus.price")

        { name: "#{month}月", sales: total_sales }
      end
    end

    def fetch_yearly_sales
      start_year = Sale.order(created_at: :asc).first.created_at.year
      end_year = Time.zone.now.year

      (start_year..end_year).map do |year|
        start_date = Time.zone.local(year, 1, 1)
        end_date = start_date.end_of_year

        sales = Sale.joins(:selected_menus).where(created_at: start_date..end_date)
        total_sales = sales.sum("selected_menus.price")

        { name: "#{year}年", sales: total_sales }
      end
    end

    def fetch_visits_by_day
      days_of_week_jp = %w[月 火 水 木 金 土 日]
      days_of_week = %w[Sunday Monday Tuesday Wednesday Thursday Friday Saturday]

      output = [
        { key: :this_year, range: Time.zone.now.all_year },
        { key: :all_time, range: nil }
      ].map do |data|
        range = data[:range]
        key = data[:key]

        visits_by_day = range ? Sale.where(created_at: range) : Sale.all
        visits_by_day = visits_by_day.group("DAYNAME(created_at)").count

        result = days_of_week.map.with_index do |day, index|
          { name: days_of_week_jp[index], visits: visits_by_day[day] || 0 }
        end

        [key, result]
      end
      output.to_h
    end

    def populate_ratio_data(res)
      menu_categories = MenuCategory.all
      age_groups = AgeGroup.all

      [
        { key: :this_month, range: Time.zone.now.all_month },
        { key: :this_year, range: Time.zone.now.all_year },
        { key: :all_time, range: nil }
      ].each do |data|
        range = data[:range]
        key = data[:key]

        menus = range ? Menu.preload(:selected_menus).where(created_at: range) : Menu.preload(:selected_menus).all
        menus.group_by(&:menu_category_id).each do |category_id, category_menus|
          selected_menus_count = category_menus.sum { |menu| menu.selected_menus.count }
          res[:menu_ratio][key].push({
            name: menu_categories.find { |category| category.id == category_id }.name,
            value: selected_menus_count
          })
        end

        sales = range ? Sale.where(created_at: range) : Sale.all
        sales.group(:gender).count.each do |gender, count|
          res[:gender_ratio][key].push({
            name: gender == 1 ? "男性" : "女性",
            value: count
          })
        end

        sales.group(:age_group_id).count.each do |age_group_id, count|
          res[:age_ratio][key].push({
            name: age_groups.find { |group| group.id == age_group_id }.name,
            value: count
          })
        end
      end
    end
end
