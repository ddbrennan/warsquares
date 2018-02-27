# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: "david", password: "123")
Party.create(name: "david's party", gold: 1000, user_id: 1)
Character.create(role: "Knight", health: 20)
Character.create(role: "Cleric", health: 15)
Character.create(role: "Mage", health: 10)
Character.create(role: "Rogue", health: 12)
Equipment.create(name: "Sword of Stabbin'", cost: 300, bonus: "Deal an extra damage every round", category: "sword", amount: 1)
Equipment.create(name: "Staff of Magic", cost: 300, bonus: "Do more magic stuff", category: "mana", amount: 1)
Equipment.create(name: "Axe of Bleediness", cost: 600, bonus: "chop things up", category: "sword", amount: 2)
Equipment.create(name: "Tabard", cost: 1200, bonus: "adds recruit option when encountering", category: "static", amount: 1)
Map.create(layout: "F0M1S2W3F2M1S4W1C8", name: "Newbland")
PartyCharacter.create(party_id: 1, character_id: 1, color: "pale", armor_color: "red", name: "davidius", role: "Knight", health: 20, max_health: 20)
PartyEquipment.create(party_id: 1, equipment_id: 1)
PartyMap.create(party_id: 1, map_id: 1, visited: "100000000", complete: false, moves: 0)
