class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|

      t.string :original_name
      t.string :name
      t.string :memo

      t.float :amount

      t.datetime :timestamp

      t.integer :account_id
      t.integer :merchant_id

      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
