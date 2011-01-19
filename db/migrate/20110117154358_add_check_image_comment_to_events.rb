class AddCheckImageCommentToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :check_image_comment, :text
  end

  def self.down
    remove_column :events, :check_image_comment
  end
end
