class EventsController < ApplicationController
  def index
    current_year = Date.today.year
    time_min = DateTime.new(current_year, 1, 1, 0, 0, 0, "+09:00").rfc3339
    time_max = DateTime.new(current_year + 1, 1, 1, 0, 0, 0, "+09:00").rfc3339

    events = GoogleCalendarService.new.list_events(
      time_min: time_min,
      time_max: time_max
    )

    render json: events.items, status: :ok
  end

  def create
    GoogleCalendarService.new.create(
      summary: params[:summary],
      description: params[:description],
      start: DateTime.parse(params[:start]),
      end_: DateTime.parse(params[:end_])
    )

    render status: :created
  end

  def update
    GoogleCalendarService.new.update(
      event_id: params[:id],
      summary: params[:summary],
      description: params[:description],
      start: DateTime.parse(params[:start]),
      end_: DateTime.parse(params[:end_])
    )

    render status: :no_content
  end

  def destroy
    GoogleCalendarService.new.delete(
      event_id: params[:id]
    )

    render status: :no_content
  end
end
