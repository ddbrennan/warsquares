class CreatePartyEquipments < ActiveRecord::Migration[5.1]
  def change
    create_table :party_equipments do |t|
      t.belongs_to :party, foreign_key: true
      t.belongs_to :equipment, foreign_key: true

      t.timestamps
    end
  end
end
