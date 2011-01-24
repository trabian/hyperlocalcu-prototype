class CreateMembers < ActiveRecord::Migration
  def self.up
    create_table :members do |t|
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
    add_column :accounts, :member_id, :integer
  end

  def self.down
    remove_column :accounts, :member_id
    drop_table :members
  end
end
