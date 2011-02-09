class Merchant < ActiveRecord::Base

  include ModelExtensions::FeedbackSubject

  # Obviously not the best way to do this
  set_callback(:create, :after) do |merchant|

    Event.where(:merchant_number => merchant.merchant_number).update_all :merchant_id => merchant.id

  end

end
