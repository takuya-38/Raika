class CreateSelectedMenus < ActiveRecord::Migration[7.1]
  def change
    create_table :selected_menus do |t|
      t.integer :menu_id
      t.integer :event_id
      t.integer :price

      t.timestamps
    end
  end
end
