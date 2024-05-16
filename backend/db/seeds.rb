require "csv"

MENUS_PATH = "public/menus.csv"
MENU_CATEGORIES_PATH = "public/menu_categories.csv"

# menu_categories
CSV.foreach(MENU_CATEGORIES_PATH) do |row|
  MenuCategory.create(
    name: row[0],
  )
end

# menus
CSV.foreach(MENUS_PATH) do |row|
  Menu.create(
    menu_category_id: row[0],
    name: row[1],
    price: row[2]
  )
end

# age_groups
group_names = [
  "10歳未満",
  "10代",
  "20代",
  "30代",
  "40代",
  "50代",
  "60歳以上",
]

group_names.each do |name|
  AgeGroup.create(
    name: name
  )
end

