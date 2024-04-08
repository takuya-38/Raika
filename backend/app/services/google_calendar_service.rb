require "google/apis/calendar_v3"
require "googleauth"
require "googleauth/stores/file_token_store"
require "date"
require "fileutils"

class GoogleCalendarService < BaseService
  def initialize
    @calendar = Google::Apis::CalendarV3::CalendarService.new
    @calendar.client_options.application_name = ENV["GOOGLE_CALENDAR_APPLICATION_NAME"]
    @calendar.authorization = authorize
    @calendar_id = ENV["GOOGLE_CALENDAR_ID"]
  end

  def create(summary:, description:, location:, start:, end_:)
    event = build_event(
      summary: summary,
      description: description,
      location: location,
      start: start,
      end_: end_
    )

    @calendar.insert_event(@calendar_id, event)
  end

  def list_events(time_min:, time_max:)
    @calendar.list_events(
      @calendar_id,
      time_min: time_min,
      time_max: time_max
    )
  end

  def update(event_id:, summary:, description:, location:, start:, end_:)
    event = build_event(
      summary: summary,
      description: description,
      location: location,
      start: start,
      end_: end_
    )
    @calendar.update_event(@calendar_id, event_id, event)
  end

  def delete(event_id:)
    @calendar.delete_event(@calendar_id, event_id)
  end

  private
    def authorize
      credential = Google::Auth::ServiceAccountCredentials.make_creds(
        json_key_io: File.open(ENV["GOOGLE_CALENDAR_SECRET_PATH"]),
        scope: Google::Apis::CalendarV3::AUTH_CALENDAR
      )
      credential.fetch_access_token!
      credential
    end

    def build_event(summary:, description:, location:, start:, end_:)
      Google::Apis::CalendarV3::Event.new(
        summary: summary,
        description: description,
        location: location,
        start: Google::Apis::CalendarV3::EventDateTime.new(date_time: start),
        end: Google::Apis::CalendarV3::EventDateTime.new(date_time: end_)
      )
    end
end
