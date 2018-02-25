class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string :role
      t.integer :health

      t.timestamps
    end
  end
end
