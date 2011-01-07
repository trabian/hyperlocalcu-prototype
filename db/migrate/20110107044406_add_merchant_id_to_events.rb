class AddMerchantIdToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :merchant_id, :integer
  end

  def self.down
    remove_column :events, :merchant_id
  end
end
