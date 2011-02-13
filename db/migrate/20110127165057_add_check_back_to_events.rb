class AddCheckBackToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :check_image_back, :string
  end

  def self.down
    remove_column :events, :check_image_back
  end
end
