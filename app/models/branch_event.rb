class BranchEvent < Event

  belongs_to :branch
  belongs_to :teller

  validates :branch_id, :presence => true
  validates :teller_id, :presence => true
  validates :amount, :presence => true

  def as_json(options = {})
    super :include => {:branch => { :methods => :address_summary }, :teller => {}}
  end

end
