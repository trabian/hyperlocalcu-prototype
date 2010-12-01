require 'rubygems'
require 'bundler/setup'

require 'sinatra'

require 'sass/plugin/rack'
require 'compass'
require 'pusher'

require 'server/app.rb'

use Rack::Auth::Basic do |username, password|
  [username, password] == ['techatchery', 'trabian']
end

use Rack::Static, :urls => ["/docs"]

set :show_exceptions, true


run Sinatra::Application
