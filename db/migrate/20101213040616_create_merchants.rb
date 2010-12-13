class CreateMerchants < ActiveRecord::Migration
  def self.up
    create_table :merchants do |t|
      t.string :name
      t.string :street1
      t.string :city
      t.string :region
      t.string :postal_code
      t.text :address_summary
      t.text :full_result

      t.timestamps
    end
  end

  def self.down
    drop_table :merchants
  end
end
