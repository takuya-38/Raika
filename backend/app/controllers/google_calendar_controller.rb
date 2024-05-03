class GoogleCalendarController < ApplicationController
  def index
    current_year = Date.today.year
    time_min = DateTime.new(current_year, 1, 1, 0, 0, 0, "+09:00").rfc3339
    time_max = DateTime.new(current_year + 1, 1, 1, 0, 0, 0, "+09:00").rfc3339

    events = Events::IndexService.new.call(
      time_min: time_min,
      time_max: time_max
    )

    formatted_events = events.items.map do |event|
      {
        id: event.id,
        start_date: event.start.date_time.strftime("%Y-%m-%d"),
        start_time: event.start.date_time.strftime("%H:%M"),
        end_date: event.end.date_time.strftime("%Y-%m-%d"),
        end_time: event.end.date_time.strftime("%H:%M"),
        summary: event.summary,
        description: event.description
      }
    end

    render json: formatted_events, status: :ok
  end

  def create
    Events::CreateService.new.call(
      summary: params[:summary],
      description: params[:description],
      start: DateTime.parse(params[:start]),
      end_: DateTime.parse(params[:end_])
    )

    render status: :created
  end

  def update
    Events::UpdateService.new.call(
      event_id: params[:id],
      summary: params[:summary],
      description: params[:description],
      start: DateTime.parse(params[:start]),
      end_: DateTime.parse(params[:end_])
    )

    render status: :no_content
  end

  def destroy
    Events::DeleteService.new.call(
      event_id: params[:id]
    )

    render status: :no_content
  end
end
