class AddVendorFeedbackFieldsToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :vendor_rating, :integer, :default => 0
    add_column :events, :vendor_comment, :text
  end

  def self.down
    remove_column :events, :vendor_comment
    remove_column :events, :vendor_rating
  end
end
