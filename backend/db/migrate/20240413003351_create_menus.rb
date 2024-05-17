class CreateMenus < ActiveRecord::Migration[7.1]
  def change
    create_table :menus do |t|
      t.references :menu_category, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :price, null: false

      t.timestamps
    end
  end
end
