get '/merchants' do
  render_backbone_json Merchant.all
end

get '/merchants/:id' do |id|

  render_backbone_json Merchant.find(id)
end

get '/merchants/:id/feedbacks' do |id|

  @merchant = Merchant.find(id)

  @merchant.feedbacks.to_json

end


