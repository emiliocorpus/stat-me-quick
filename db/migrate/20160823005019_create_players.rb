class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :full_name
      t.string :first_name
      t.string :last_name

      t.timestamps null: false
    end
  end
end
