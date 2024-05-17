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

# Sales
1700.times do
  Sale.create(
    age_group_id: rand(1..7),
    google_calendar_id: 1,
    gender: rand(1..2),
    created_at: Faker::Date.between(from: '2018-01-01', to: '2023-12-31'),
    updated_at: Time.current
  )
end

300.times do
  Sale.create(
    age_group_id: rand(1..7),
    google_calendar_id: 1,
    gender: rand(1..2),
    created_at: Faker::Date.between(from: '2024-01-01', to: '2024-05-17'),
    updated_at: Time.current
  )
end

# SelectedMenu
menu_prices = {
  1 => 5500,
  2 => 550,
  3 => 1100,
  4 => 1980,
  5 => 5830,
  6 => 5830,
  7 => 5830,
  8 => 550,
  9 => 16500,
  10 => 2200,
  11 => 2750,
  12 => 3300
}

2000.times do |i|
  menu_id = rand(1..12)
  SelectedMenu.create(
    menu_id: menu_id,
    sale_id: i + 1,
    price: menu_prices[menu_id]
  )
end

500.times do |i|
  menu_id = rand(1..12)
  SelectedMenu.create(
    menu_id: menu_id,
    sale_id: rand(1..2000),
    price: menu_prices[menu_id]
  )
end
