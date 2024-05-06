class SelectedMenu < ApplicationRecord
  belongs_to :event
  belongs_to :menu
  validates :menu_id, :price, presence: :true
end
