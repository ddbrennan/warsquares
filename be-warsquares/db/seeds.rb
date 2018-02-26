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
Equipment.create(name: "Sword of Stabbin'", amount: 300, bonus: "Deal an extra damage every round")
Equipment.create(name: "Staff of Magic", amount: 300, bonus: "Do more magic stuff")
Equipment.create(name: "Axe of Bleediness", amount: 300, bonus: "chop things up")
Equipment.create(name: "Tabard", amount: 300, bonus: "adds recruit option when encountering")
Map.create(layout: "F0M1S2W3F2M1S4W1C8")
PartyCharacter.create(party_id: 1, character_id: 1, color: "pale", armor_color: "red", name: "davidius")
PartyEquipment.create(party_id: 1, equipment_id: 1)
PartyMap.create(party_id: 1, map_id: 1, visited: "100000000", complete: false, moves: 0)
