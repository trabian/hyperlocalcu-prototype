class Teller < ActiveRecord::Base

  include ModelExtensions::FeedbackSubject

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  def name
    [first_name, last_name].join(' ')
  end

end
