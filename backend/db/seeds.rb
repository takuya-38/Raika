require "csv"

MENUS_PATH = "public/menus.csv"

# menusテーブル
CSV.foreach(MENUS_PATH) do |row|
  Menu.create(
    name: row[0],
    price: row[1]
  )
end
