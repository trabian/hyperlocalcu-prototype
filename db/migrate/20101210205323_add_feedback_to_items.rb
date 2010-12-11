class AddFeedbackToItems < ActiveRecord::Migration
  def self.up
    add_column :items, :rating, :integer
    add_column :items, :comment, :text
  end

  def self.down
    remove_column :items, :comment
    remove_column :items, :rating
  end
end
