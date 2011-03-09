class BillpayEvent < Event

  include ModelExtensions::MerchantEvent

  validates :amount, :presence => true

  def as_json(options = {})
    super :methods => :vendor
  end

end
