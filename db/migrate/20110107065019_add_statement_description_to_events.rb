class AddStatementDescriptionToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :opening_balance, :float
    add_column :events, :deposits, :float
    add_column :events, :withdrawals, :float
    add_column :events, :ending_balance, :float
  end

  def self.down
    remove_column :events, :ending_balance
    remove_column :events, :withdrawals
    remove_column :events, :deposits
    remove_column :events, :opening_balance
  end
end
