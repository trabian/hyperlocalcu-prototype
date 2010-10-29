require 'mongo'
require 'fastercsv'

Dir["#{File.dirname(__FILE__)}/models/*.rb"].each { |f| load(f) }
