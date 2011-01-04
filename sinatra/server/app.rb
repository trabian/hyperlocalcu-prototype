require 'sinatra'
require 'haml'
require 'mongoid'

require 'juggernaut'

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

configure :development do

  ENV['PUSHER_URL'] = 'http://458ecea51903933ff9fb:9454fffb7dc81026b35b@api.pusherapp.com/apps/3014'

end

configure do

  set :haml, { :format => :html5 }
  set :views, Proc.new { File.join(root, "server", "app", "views") }

  Pusher.url = ENV['PUSHER_URL']

end

mime_type :handlebars, "text/html"

Dir["#{File.dirname(__FILE__)}/app/controllers/*.rb"].each { |f| load(f) }

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/merchant_dashboard' do
  haml :merchant_dashboard
end

get '/merchant_dashboard.html' do
  haml :merchant_dashboard
end
