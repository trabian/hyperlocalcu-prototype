class CardEvent < Event

  belongs_to :merchant

  validates :amount, :presence => true

  def as_json(options = {})
    super :include => :merchant
  end

end
