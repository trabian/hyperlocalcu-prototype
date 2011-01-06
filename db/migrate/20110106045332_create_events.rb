class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.integer :id
      t.float :amount
      t.string :type
      t.integer :atm_id
      t.datetime :posted_at
      t.integer :account_id
    end
  end

  def self.down
    drop_table :events
  end
end
