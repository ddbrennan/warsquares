class CreatePartyMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :party_maps do |t|

      t.timestamps
    end
  end
end
