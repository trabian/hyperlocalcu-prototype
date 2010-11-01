require 'rubygems'
require 'bundler/setup'

require 'sinatra'

require 'sass/plugin/rack'
require 'compass'

require 'app.rb'

run Sinatra::Application
