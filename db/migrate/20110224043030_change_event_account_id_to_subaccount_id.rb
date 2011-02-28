class ChangeEventAccountIdToSubaccountId < ActiveRecord::Migration
  def self.up
    rename_column :events, :account_id, :subaccount_id
  end

  def self.down
    rename_column :events, :subaccount_id, :account_id
  end
end
