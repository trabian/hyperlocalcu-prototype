class AddRewardsToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :rewards, :string
  end

  def self.down
    remove_column :events, :rewards
  end
end
