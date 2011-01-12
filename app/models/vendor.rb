class Vendor < ActiveRecord::Base

  validates :name, :presence => true
  validates :question, :presence => true

end
