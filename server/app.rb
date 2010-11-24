require 'sinatra'
require 'haml'
require 'mongoid'

require File.join(File.dirname(__FILE__), 'init')

Mongoid.configure do |config|

  if ENV['MONGOHQ_URL']

    uri = URI.parse(ENV['MONGOHQ_URL'])
    conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
    config.master = conn.db(uri.path.gsub(/^\//, ''))

  else
    config.master = Mongo::Connection.new.db('techatchery-hyperlocalcu')
  end
  
end

configure do

  set :haml, { :format => :html5 }
  set :views, Proc.new { File.join(root, "server", "app", "views") }

end

mime_type :handlebars, "text/html"

get '/items' do
  Item.ordered.to_json(:except => ["_id"], :methods => ["id", :merchant])
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/merchants' do
  Merchant.all.to_json(:except => ["_id"], :methods => ["id"])
end

put '/items/:item_id/feedback' do

  item = Item.find(params[:item_id])

  item.create_feedback :response => params[:response]

  item.to_json

end

get '/demo/snapshots' do
  Snapshot.ordered.to_json(:except => ["_id"], :methods => ["id"])
end

post '/demo/snapshots/:id/restore' do |id|
  Snapshot.find(id).restore
  'Snapshot has been restored'
end

post '/demo/snapshots' do
  snapshot = Snapshot.create(JSON.parse(request.body.read.to_s))
  "Snapshot created"
end

delete '/demo/snapshots/:id' do |id|
  Snapshot.find(id).destroy
end
