module Events
  class CreateService < ::Events::BaseService
    include Events::BuildEvent

    def call(summary:, description:, start:, end_:)
      event = build_event(
        summary: summary,
        description: description,
        start: start,
        end_: end_
      )

      @calendar.insert_event(@calendar_id, event)
    end
  end
end
