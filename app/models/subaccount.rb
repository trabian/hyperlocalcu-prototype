class Subaccount < ActiveRecord::Base

  has_many :events

  belongs_to :account
  
  def member
    self.try(:account).try(:member)
  end

end
