require "test_helper"

class GoogleCalendarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get google_calendar_index_path
    assert_response :success
  end
end
