class Account < ActiveRecord::Base

  has_many :items
  has_many :events

  belongs_to :member

end
