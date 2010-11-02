require 'sinatra'
require 'haml'
require 'mongoid'
require 'sass'
require 'compass'

Dir["#{File.dirname(__FILE__)}/lib/demo.rb"].each { |f| load(f) }

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

  Compass.configuration do |config|
    config.project_path = File.dirname(__FILE__)
    config.sass_path = 'views/stylesheets'
  end

  set :haml, { :format => :html5 }
  set :sass, Compass.sass_engine_options

end

mime_type :handlebars, "text/html"

get '/' do
  haml :index
end

get '/items.json' do
  Item.ordered.to_json
end

get '/screen.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :screen, Compass.sass_engine_options
end
