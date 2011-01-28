class AddAddressToMembers < ActiveRecord::Migration
  def self.up
    add_column :members, :street1, :string
    add_column :members, :city, :string
    add_column :members, :region, :string
    add_column :members, :postal_code, :string
  end

  def self.down
    remove_column :members, :postal_code
    remove_column :members, :region
    remove_column :members, :city
    remove_column :members, :street1
  end
end
