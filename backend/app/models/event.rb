class Event < ApplicationRecord
  has_many :selected_menus, dependent: :destroy
  validates :age_group_id, :google_calendar_id, :gender, presence: true
end
