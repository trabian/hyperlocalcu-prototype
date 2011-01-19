class AddAvatarToTellers < ActiveRecord::Migration
  def self.up
    add_column :tellers, :avatar, :string
  end

  def self.down
    remove_column :tellers, :avatar
  end
end
