class CreateBranches < ActiveRecord::Migration
  def self.up
    create_table :branches do |t|
      t.string :name

      t.string :street1
      t.string :city
      t.string :region
      t.string :postal_code
      t.timestamps
    end
  end

  def self.down
    drop_table :branches
  end
end
