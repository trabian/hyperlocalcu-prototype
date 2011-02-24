class Account < ActiveRecord::Base

  belongs_to :member

  has_many :subaccounts

end
