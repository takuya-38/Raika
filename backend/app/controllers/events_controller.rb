class EventsController < ApplicationController
  before_action :set_event, only: [:update, :destroy]

  def index
    events = Event.all
    render json: events
  end

  def create
    event = Event.new(event_params)

    event.transaction do
      if event.save
        create_selected_menus(event)
        render json: event, status: :created
      else
        render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => error
    render json: { "errors": error.record.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    @event.transaction do
      if @event.update(event_params)
        update_selected_menus(@event)
        render json: @event
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => error
    render json: { "errors": error.record.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @event.destroy
    head :no_content
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:age_group_id, :google_calendar_id, :gender, :total_price)
    end

    def selected_menu_params
      params.require(:event).permit(menus: [:id, :price])
    end

    def create_selected_menus(event)
      selected_menu_params[:menus].each do |menu|
        event.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
      end
    end

    def update_selected_menus(event)
      event.selected_menus.destroy_all
      selected_menu_params[:menus].each do |menu|
        event.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
      end
    end
end
