class AddCheckImageToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :check_image, :string
  end

  def self.down
    remove_column :events, :check_image
  end
end
