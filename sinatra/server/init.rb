root = File.dirname(__FILE__)

$LOAD_PATH.unshift "#{root}/lib"

require "model_extensions"

Dir["#{root}/app/models/*.rb"].each { |f| load(f) }
