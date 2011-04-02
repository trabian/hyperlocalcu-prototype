require 'rubygems'
require 'ci/reporter/rake/cucumber'
require 'ci/reporter/rake/rspec'

desc 'Run jenkins tests'
task :jenkins => ["ci:setup:rspec", "spec"]
