class PartyMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :party_maps do |t|
      t.belongs_to :party, foreign_key: true
      t.belongs_to :map, foreign_key: true
      t.string :visited
      t.boolean :complete
      t.integer :moves
      t.string :current_square

      t.timestamps
    end
  end
end
