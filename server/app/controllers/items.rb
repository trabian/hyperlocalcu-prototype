get '/items' do
  Item.ordered.to_json(:methods => [:merchant])
end

put '/items/:item_id/feedback' do

  item = Item.find(params[:item_id])

  item.create_feedback :response => params[:response]

  item.to_json

end
