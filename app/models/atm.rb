class Atm < ActiveRecord::Base

  include ModelExtensions::FeedbackSubject

  def address_summary
    "#{street1}<br />#{city}, #{region}"
  end

end
