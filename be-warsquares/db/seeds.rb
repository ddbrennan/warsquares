# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Character.create(role: "Knight", health: 20)
Character.create(role: "Cleric", health: 15)
Character.create(role: "Mage", health: 10)
Character.create(role: "Rogue", health: 12)
Equipment.create(name: "Sword of Stabbin'", cost: 300, bonus: "A sword for stabbing people.", category: "sword", amount: 1)
Equipment.create(name: "Staff of Amber", cost: 300, bonus: "A staff for milquetoast spellcasters.", category: "mana", amount: 1)
Equipment.create(name: "Axe of Bleediness", cost: 600, bonus: "A very sharp, wet axe.", category: "sword", amount: 2)
Equipment.create(name: "Tabard", cost: 1200, bonus: "Helps develop your party's brand.", category: "static", amount: 1)
Equipment.create(name: "The Two Daggers", cost: 1200, bonus: "Much better than 1 dagger.", category: "sword", amount: 2)
Equipment.create(name: "Hammer of Good Health", cost: 1200, bonus: "Lets you focus on the needs of others.", category: "heart", amount: 2)
