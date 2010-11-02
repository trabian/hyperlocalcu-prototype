begin
  # Require the preresolved locked set of gems.
  require ::File.expand_path('../.bundle/environment', __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup
end

require 'rake'
require 'mongoid'

Mongoid.configure do |config|
  config.master = Mongo::Connection.new.db('techatchery_demo')
end

require File.join(File.dirname(__FILE__), 'lib', 'demo')

namespace :import do

  desc "Import items provided in ENV['FILE']"
  task :items do
    file = ENV['FILE']

    Item.destroy_all

    FasterCSV.foreach(file) do |row|

      attributes = {
        :timestamp => row[0],
        :name => row[1],
        :original_name => row[2],
        :amount => row[3]
      }

      unless (row[4].blank?)
        attributes[:offer] = {
          :title => row[4],
          :url => row[5],
          :amount => row[6],
          :category => row[7]
        }
      end

      Item.create(attributes)


    end

  end

end

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'
