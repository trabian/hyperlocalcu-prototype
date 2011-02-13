class Vendor < ActiveRecord::Base

  include ModelExtensions::FeedbackSubject

  validates :name, :presence => true
  validates :question, :presence => true

end
