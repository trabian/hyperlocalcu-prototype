class BillpayEvent < Event

  include ModelExtensions::MerchantEvent

  validates :amount, :presence => true

  def as_json(options = {})
    super :methods => [:vendor]
  end

  def vendor
    Vendor.find_by_event_type(event_type)
  end

end
