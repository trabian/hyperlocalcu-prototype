class Item < ActiveRecord::Base

  belongs_to :account

  scope :ordered, :order => 'timestamp DESC, name'

end
