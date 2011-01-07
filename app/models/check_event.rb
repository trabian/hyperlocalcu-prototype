class CheckEvent < Event

  belongs_to :merchant

  validates :amount, :presence => true
  validates :check_number, :presence => true

  def as_json(options = {})
    super :include => :merchant
  end

end
