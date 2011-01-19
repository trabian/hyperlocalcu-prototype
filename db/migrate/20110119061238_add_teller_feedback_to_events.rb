class AddTellerFeedbackToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :teller_rating, :integer
    add_column :events, :teller_comment, :text
  end

  def self.down
    remove_column :events, :teller_comment
    remove_column :events, :teller_rating
  end
end
