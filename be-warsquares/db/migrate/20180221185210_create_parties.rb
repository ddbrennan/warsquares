class CreateParties < ActiveRecord::Migration[5.1]
  def change
    create_table :parties do |t|
      t.string :name
      t.integer :gold
      t.belongs_to :user, foreign_key: true
      t.integer :current_map

      t.timestamps
    end
  end
end
