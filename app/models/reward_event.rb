class RewardEvent < Event

  validates :amount, :presence => true

  validates :rewards, :presence => true

end
