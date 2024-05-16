class Menu < ApplicationRecord
  belongs_to :menu_category
  has_many :selected_menus
end
