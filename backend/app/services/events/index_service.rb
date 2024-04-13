module Events
  class IndexService < ::Events::BaseService
    def call(time_min:, time_max:)
      @calendar.list_events(
        @calendar_id,
        max_results: 2500,
        time_min: time_min,
        time_max: time_max,
        single_events: true,
        order_by: "startTime"
      )
    end
  end
end
