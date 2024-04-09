module Events
  class DeleteService < ::Events::BaseService
    def call(event_id:)
      @calendar.delete_event(@calendar_id, event_id)
    end
  end
end
