class Branch < ActiveRecord::Base
  
  def address_summary
    "#{street1}<br />#{city}, #{region}"
  end

end
