class AddTeamNameAndLinkToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :team, :string
    add_column :players, :link, :string
  end
end
