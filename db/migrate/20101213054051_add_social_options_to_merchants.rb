class AddSocialOptionsToMerchants < ActiveRecord::Migration
  def self.up
    add_column :merchants, :twitter_username, :string
    add_column :merchants, :facebook_username, :string
    add_column :merchants, :avatar, :string
  end

  def self.down
    remove_column :merchants, :avatar
    remove_column :merchants, :facebook_username
    remove_column :merchants, :twitter_username
  end
end
