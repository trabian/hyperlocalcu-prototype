class AddBillPaymentProcessingFields < ActiveRecord::Migration
  def self.up
    add_column :events, :bill_payment_processing_days, :integer
    add_column :events, :bill_payment_submitted_date, :datetime 
  end

  def self.down
    remove_column :events, :bill_payment_submitted_date
    remove_column :events, :bill_payment_processing_days
  end
end
