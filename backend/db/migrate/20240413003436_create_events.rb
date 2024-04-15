class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.references :age_group, null: false, foreign_key: true
      t.integer :google_calendar_id, null: false
      t.integer :gender, null: false

      t.timestamps
    end
  end
end
