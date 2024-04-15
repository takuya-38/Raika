class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.integer :age_group_id
      t.integer :google_calendar_id
      t.integer :gender

      t.timestamps
    end
  end
end
