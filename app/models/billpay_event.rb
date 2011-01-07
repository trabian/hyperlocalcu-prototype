class BillpayEvent < Event

  belongs_to :merchant

  validates :merchant_id, :presence => true
  validates :amount, :presence => true

  def as_json(options = {})
    super :include => :merchant
  end

end
