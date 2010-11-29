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

def render_backbone_json(obj)
  obj.to_json(:except => ["_id"], :methods => ["id"])
end

Dir["#{File.dirname(__FILE__)}/app/controllers/*.rb"].each { |f| load(f) }

get '/' do
  File.read(File.join('public', 'index.html'))
end

