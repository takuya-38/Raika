class SelectedMenu < ApplicationRecord
  belongs_to :sale
  belongs_to :menu
  validates :menu_id, :price, presence: :true
end
