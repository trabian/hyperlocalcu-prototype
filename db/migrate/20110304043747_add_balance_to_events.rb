class AddBalanceToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :balance, :float
  end

  def self.down
    remove_column :events, :balance
  end
end
