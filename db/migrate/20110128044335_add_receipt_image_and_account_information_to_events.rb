class AddReceiptImageAndAccountInformationToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :receipt_image, :string
    add_column :events, :account_information, :text
  end

  def self.down
    remove_column :events, :account_information
    remove_column :events, :receipt_image
  end
end
