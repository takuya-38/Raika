class SelectedMenu < ApplicationRecord
  belongs_to :event
  validates :menu_id, :price, presence: :true
end
