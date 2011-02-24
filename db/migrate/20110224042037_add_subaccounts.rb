class AddSubaccounts < ActiveRecord::Migration
  def self.up

    create_table :subaccounts do |t|
      t.integer :account_id
      t.string :name
      t.string :suffix
      t.string :account_type
      t.float :balance
      t.float :availableBalance
      t.timestamps
    end

    remove_column :accounts, :balance
    remove_column :accounts, :name

  end

  def self.down

    add_column :accounts, :name
    add_column :accounts, :balance

    drop_table :subaccounts

  end
end
