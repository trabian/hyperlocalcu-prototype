class BillpayEvent < Event

  include ModelExtensions::MerchantEvent

  validates :amount, :presence => true

end
