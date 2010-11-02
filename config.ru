require 'rubygems'
require 'bundler/setup'

require 'sinatra'

require 'sass/plugin/rack'
require 'compass'

require 'app.rb'

use Rack::Auth::Basic do |username, password|
  [username, password] == ['techatchery', 'trabian']
end

run Sinatra::Application
