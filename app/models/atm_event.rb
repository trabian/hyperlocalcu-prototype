class AtmEvent < Event

  belongs_to :atm

  validates :atm_id, :presence => true
  validates :amount, :presence => true

  def as_json(options = {})
    super :include => :atm
  end

end
