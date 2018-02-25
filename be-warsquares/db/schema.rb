# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180223150153) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "role"
    t.integer "health"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "equipment", force: :cascade do |t|
    t.string "bonus"
    t.integer "amount"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "maps", force: :cascade do |t|
    t.string "layout"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "parties", force: :cascade do |t|
    t.string "name"
    t.integer "gold"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_parties_on_user_id"
  end

  create_table "party_characters", force: :cascade do |t|
    t.bigint "party_id"
    t.bigint "character_id"
    t.string "color"
    t.string "armor_color"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_party_characters_on_character_id"
    t.index ["party_id"], name: "index_party_characters_on_party_id"
  end

  create_table "party_equipments", force: :cascade do |t|
    t.bigint "party_id"
    t.bigint "equipment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipment_id"], name: "index_party_equipments_on_equipment_id"
    t.index ["party_id"], name: "index_party_equipments_on_party_id"
  end

  create_table "party_maps", force: :cascade do |t|
    t.bigint "party_id"
    t.bigint "map_id"
    t.string "visited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["map_id"], name: "index_party_maps_on_map_id"
    t.index ["party_id"], name: "index_party_maps_on_party_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "parties", "users"
  add_foreign_key "party_characters", "characters"
  add_foreign_key "party_characters", "parties"
  add_foreign_key "party_equipments", "equipment"
  add_foreign_key "party_equipments", "parties"
  add_foreign_key "party_maps", "maps"
  add_foreign_key "party_maps", "parties"
end
