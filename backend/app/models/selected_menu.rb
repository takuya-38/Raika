class SelectedMenu < ApplicationRecord
  belongs_to :event
  validates :menu_id, :price, presemce: :true
end
