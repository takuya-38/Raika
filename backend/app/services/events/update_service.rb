module Events
  class UpdateService < ::Events::BaseService
    include Events::BuildEvent

    def call(event_id:, summary:, description:, start:, end_:)
      event = build_event(
        summary: summary,
        description: description,
        start: start,
        end_: end_
      )
      @calendar.update_event(@calendar_id, event_id, event)
    end
  end
end
