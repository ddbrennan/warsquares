class PartyCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :party_characters do |t|
      t.belongs_to :party, foreign_key: true
      t.belongs_to :character, foreign_key: true

      t.timestamps
    end
  end
end
