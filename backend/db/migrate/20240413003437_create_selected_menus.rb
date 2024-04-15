class CreateSelectedMenus < ActiveRecord::Migration[7.1]
  def change
    create_table :selected_menus do |t|
      t.references :menu, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.integer :price, null: false

      t.timestamps
    end
  end
end
