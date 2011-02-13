class CheckEvent < Event

  include ModelExtensions::MerchantEvent

  validates :amount, :presence => true
  validates :check_number, :presence => true

end
