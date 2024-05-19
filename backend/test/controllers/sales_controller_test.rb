require "test_helper"

class SalesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sale = sales(:one)
  end

  test "should show sale" do
    get sale_url(@sale.google_calendar_id), as: :json
    assert_response :success
  end

  test "should create sale" do
    assert_difference("Sale.count") do
      post sales_url, params: { sale: { age_group_id: 1, google_calendar_id: "1", gender: 1, menus: [{ id: menus(:cut).id, price: 1000 }, { id: menus(:retouch).id, price: 1000 }] } }, as: :json
    end

    assert_response :created
  end

  test "should update sale" do
    patch sale_url(@sale.google_calendar_id), params: { sale: { age_group_id: 2, google_calendar_id: "1", gender: 2, menus: [{ id: menus(:cut).id, price: 1500 }, { id: menus(:retouch).id, price: 1500 }] } }, as: :json
    assert_response :success
  end

  test "should destroy sale" do
    assert_difference("Sale.count", -1) do
      delete sale_url(@sale.google_calendar_id), as: :json
    end

    assert_response :no_content
  end
end
