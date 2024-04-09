require "google/apis/calendar_v3"

module Events
  module BuildEvent
    def build_event(summary:, description:, start:, end_:)
      Google::Apis::CalendarV3::Event.new(
        summary: summary,
        description: description,
        start: Google::Apis::CalendarV3::EventDateTime.new(date_time: start),
        end: Google::Apis::CalendarV3::EventDateTime.new(date_time: end_)
      )
    end
  end
end
