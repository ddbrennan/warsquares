class PartyMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :party_maps do |t|
      t.belongs_to :party, foreign_key: true
      t.belongs_to :map, foreign_key: true
      t.string :visited
      t.boolean :complete, default: false
      t.integer :moves, default: 0
      t.string :current_square, default: "00"

      t.timestamps
    end
  end
end
