class RenameSubaccountFieldsForConsistency < ActiveRecord::Migration
  def self.up
    rename_column :subaccounts, :availableBalance, :available_balance
  end

  def self.down
    rename_column :subaccounts, :available_balance, :availableBalance
  end
end
