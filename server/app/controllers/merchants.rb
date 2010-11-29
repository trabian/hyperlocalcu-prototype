get '/merchants' do
  Merchant.all.to_json(:except => ["_id"], :methods => ["id"])
end

get '/merchants/:id/feedbacks' do |id|

  @merchant = Merchant.find(id)

  @merchant.feedbacks.to_json

end


