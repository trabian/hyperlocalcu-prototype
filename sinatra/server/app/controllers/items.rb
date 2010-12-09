get '/items' do
  Item.ordered.to_json(:methods => [:merchant, :location])
end

put '/items/:id' do |id|

  updatable_attributes = ["rating"]

  attributes = JSON.parse(request.body.read.to_s)

  attributes = attributes.delete_if { |key, val| ! updatable_attributes.include? key }

  item = Item.find(id)

  item.update_attributes(attributes)

  item.to_json

end

put '/items/:item_id/feedback' do

  item = Item.find(params[:item_id])

  item.create_feedback :response => params[:response]

  item.to_json

end
