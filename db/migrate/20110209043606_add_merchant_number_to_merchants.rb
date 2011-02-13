class AddMerchantNumberToMerchants < ActiveRecord::Migration
  def self.up
    add_column :merchants, :merchant_number, :string
  end

  def self.down
    remove_column :merchants, :merchant_number
  end
end
