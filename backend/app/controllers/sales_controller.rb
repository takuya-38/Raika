class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :update, :destroy]

  def index
    current_year = Time.current.year
    sales = Sale.where(created_at: Time.new(current_year, 1, 1)..Time.new(current_year, 12, 31)).includes(:selected_menus)

    formatted_data = (1..12).map do |month|
      month_sales = sales.select { |sale| sale.created_at.month == month }
      {
        date: Date::ABBR_MONTHNAMES[month],
        来店人数: month_sales.size,
        総売上: month_sales.sum { |sale| sale.selected_menus.sum(:price) }
      }
    end

    render json: [{ year: current_year, data: formatted_data }]
  end

  def show
    render json: @sale, include: :selected_menus
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
end
