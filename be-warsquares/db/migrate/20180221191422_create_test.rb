class CreateTest < ActiveRecord::Migration[5.1]
  def change
    create_table :tests do |t|
      t.belongs_to :user, foreign_key: true
    end
  end
end
