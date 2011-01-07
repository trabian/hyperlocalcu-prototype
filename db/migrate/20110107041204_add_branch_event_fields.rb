class AddBranchEventFields < ActiveRecord::Migration
  def self.up
    add_column :events, :branch_id, :integer
    add_column :events, :teller_id, :integer
  end

  def self.down
    remove_column :events, :teller_id
    remove_column :events, :branch_id
  end
end
