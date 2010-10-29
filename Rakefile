begin
  # Require the preresolved locked set of gems.
  require ::File.expand_path('../.bundle/environment', __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup
end

require 'mongoid'

Mongoid.configure do |config|
  config.master = Mongo::Connection.new.db('techatchery_demo')
end

require File.join(File.dirname(__FILE__), 'lib', 'demo')

namespace :import do

  task :items do
    file = ENV['FILE']

    FasterCSV.foreach(file) do |row|

      Item.create(
        :timestamp => row[0],
        :name => row[1],
        :original_name => row[2],
        :amount => row[3]
      )

    end

  end

end
