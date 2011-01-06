class CreateAtms < ActiveRecord::Migration
  def self.up
    create_table :atms do |t|
      t.string :name
      t.string :street1
      t.string :city
      t.string :region
      t.string :postal_code
    end
  end

  def self.down
    drop_table :atms
  end
end
