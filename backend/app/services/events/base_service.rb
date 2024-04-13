require "google/apis/calendar_v3"
require "googleauth"

module Events
  class BaseService
    def initialize
      @calendar = Google::Apis::CalendarV3::CalendarService.new
      @calendar.client_options.application_name = ENV["GOOGLE_CALENDAR_APPLICATION_NAME"]
      @calendar.authorization = authorize
      @calendar_id = ENV["GOOGLE_CALENDAR_ID"]
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
  end
end
