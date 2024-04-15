require "csv"

MENUS_PATH = "public/menus.csv"

# menus
CSV.foreach(MENUS_PATH) do |row|
  Menu.create(
    name: row[0],
    price: row[1]
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
