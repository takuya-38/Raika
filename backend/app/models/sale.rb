class Sale < ApplicationRecord
  belongs_to :age_group

  has_many :selected_menus, dependent: :destroy
  validates :age_group_id, :gender, presence: true
end
