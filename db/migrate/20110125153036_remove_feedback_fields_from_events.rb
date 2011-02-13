class RemoveFeedbackFieldsFromEvents < ActiveRecord::Migration
  def self.up
    remove_column :events, :vendor_comment
    remove_column :events, :vendor_rating
    remove_column :events, :teller_comment
    remove_column :events, :teller_rating
  end

  def self.down
    add_column :events, :teller_rating, :integer
    add_column :events, :teller_comment, :text
    add_column :events, :vendor_rating, :integer
    add_column :events, :vendor_comment, :text
  end
end
