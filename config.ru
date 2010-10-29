require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'rack/coffee'

require 'sass/plugin/rack'
require 'compass'

require 'app.rb'

use Rack::Coffee, {
  :nowrap => true
}

run Sinatra::Application
