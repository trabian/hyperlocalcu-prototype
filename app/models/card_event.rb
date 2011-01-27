class CardEvent < Event

  include ModelExtensions::MerchantEvent

  validates :amount, :presence => true

end
