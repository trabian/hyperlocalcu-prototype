class Subaccount < ActiveRecord::Base

  has_many :events

  belongs_to :account

  has_many :statements, :order => 'statement_date DESC'
  
  def member
    self.try(:account).try(:member)
  end

  def as_json(options = {})

    super :include => :statements

  end

end
