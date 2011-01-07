class AddCheckNumberToEvents < ActiveRecord::Migration
  def self.up
    add_column :events, :check_number, :integer
  end

  def self.down
    remove_column :events, :check_number
  end
end
