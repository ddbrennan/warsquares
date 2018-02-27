class CreateMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :maps do |t|
      t.string :layout
      t.string :name

      t.timestamps
    end
  end
end
