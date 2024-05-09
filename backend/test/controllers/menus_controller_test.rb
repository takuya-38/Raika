require "test_helper"

class MenusControllerTest < ActionDispatch::IntegrationTest
  setup do
    @menu = menus(:cut)
  end

  test "should get index" do
    get menus_url, as: :json
    assert_response :success
  end

  test "should create menu" do
    assert_difference("Menu.count") do
      post menus_url, params: { menu: { name: "New Menu", price: 1000 } }, as: :json
    end

    assert_response :created
  end

  test "should update menu" do
    patch menu_url(@menu), params: { menu: { name: "Updated Menu", price: 1500 } }, as: :json
    assert_response :success
  end

  test "should destroy menu" do
    assert_difference("Menu.count", -1) do
      delete menu_url(@menu), as: :json
    end

    assert_response :no_content
  end

  test "should return not found error when menu is not found" do
    delete menu_url(id: 999), as: :json
    assert_response :not_found
    assert_equal({ "error" => "Menu not found" }, JSON.parse(response.body))
  end
end
