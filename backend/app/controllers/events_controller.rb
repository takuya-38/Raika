class EventsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :set_event, only: %i[ update destroy ]

  def index
    events = Event.all
    render json: events
  end

  def create
    event = Event.new(event_params)

    Event.transaction do
      if event.save
        selected_menu_params[:menus].each do |menu|
          event.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
        end
        render json: event, status: :created
      else
        render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    Event.transaction do
      @event.selected_menus.destroy_all

      selected_menu_params[:menus].each do |menu|
        @event.selected_menus.create!(menu_id: menu[:id], price: menu[:price])
      end

      if @event.update(event_params)
        render json: @event
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
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

    def record_not_found
      render json: { error: "Event not found" }, status: :not_found
    end
end
