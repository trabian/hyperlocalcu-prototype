class AddBalanceToAccounts < ActiveRecord::Migration
  def self.up
    add_column :accounts, :balance, :float
  end

  def self.down
    remove_column :accounts, :balance
  end
end
