class MenusController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :set_menu, only: %i[ update destroy ]

  def index
    menus = Menu.all
    render json: menus
  end

  def create
    menu = Menu.new(menu_params)

    if menu.save
      render json: menu, status: :created
    else
      render json: { errors: menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @menu.update(menu_params)
      render json: @menu
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @menu.destroy
    head :no_content
  end

  private
    def set_menu
      @menu = Menu.find(params[:id])
    end

    def menu_params
      params.require(:menu).permit(:name, :price)
    end

    def record_not_found
      render json: { error: "Menu not found" }, status: :not_found
    end
end
