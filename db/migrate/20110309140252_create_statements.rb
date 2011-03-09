class CreateStatements < ActiveRecord::Migration
  def self.up
    create_table :statements do |t|
      t.string :filename
      t.date :statement_date
      t.integer :subaccount_id

      t.timestamps
    end
  end

  def self.down
    drop_table :statements
  end
end
