class SelectedMenu < ApplicationRecord
  belongs_to :event, :menu
  validates :menu_id, :price, presence: :true
end
