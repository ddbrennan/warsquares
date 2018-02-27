class PartyCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :party_characters do |t|
      t.belongs_to :party, foreign_key: true
      t.belongs_to :character, foreign_key: true
      t.string :color
      t.string :armor_color
      t.string :name
      t.string :role
      t.integer :health
      t.integer :mana, default: 0

      t.timestamps
    end
  end
end
