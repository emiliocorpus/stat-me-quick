class AddMoreInformationToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :pos, :string
    add_column :players, :exp, :integer
    add_column :players, :school, :string
  end
end
