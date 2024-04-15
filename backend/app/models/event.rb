class Event < ApplicationRecord
  belongs_to :age_group, foreign_key: :age_group_id

  has_many :selected_menus, dependent: :destroy
  validates :age_group_id, :google_calendar_id, :gender, presence: true
end
