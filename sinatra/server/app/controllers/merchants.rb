get '/merchants' do
  Merchant.all.to_json
end

get '/merchants/:id' do |id|
  Merchant.find(id).to_json
end

get '/merchants/:id/feedbacks' do |id|

  @merchant = Merchant.find(id)

  @merchant.feedbacks.to_json

end


