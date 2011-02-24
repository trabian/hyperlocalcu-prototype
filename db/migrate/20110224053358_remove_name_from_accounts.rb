class RemoveNameFromAccounts < ActiveRecord::Migration
  def self.up
    remove_column :accounts, :name
  end

  def self.down
    add_column :accounts, :name, :string
  end
end
