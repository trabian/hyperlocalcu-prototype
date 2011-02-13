class AddMerchantNumberToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :merchant_number, :string
  end

  def self.down
    remove_column :events, :merchant_number
  end
end
