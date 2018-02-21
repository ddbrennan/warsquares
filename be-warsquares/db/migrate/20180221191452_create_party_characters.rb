class CreatePartyCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :party_characters do |t|

      t.timestamps
    end
  end
end
