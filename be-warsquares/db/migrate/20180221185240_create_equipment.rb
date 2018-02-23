class CreateEquipment < ActiveRecord::Migration[5.1]
  def change
    create_table :equipment do |t|
      t.string :bonus
      t.integer :amount
      t.string :name

      t.timestamps
    end
  end
end
