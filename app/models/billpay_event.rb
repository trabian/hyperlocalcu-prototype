class BillpayEvent < Event

  include ModelExtensions::MerchantEvent

  validates :merchant_id, :presence => true
  validates :amount, :presence => true


end
