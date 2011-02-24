class Subaccount < ActiveRecord::Base

  has_many :events

  belongs_to :account

end
