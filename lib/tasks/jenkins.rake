require 'rubygems'
require 'ci/reporter/rake/cucumber'
require 'ci/reporter/rake/rspec'

task :install_bundle do
  system "bundle install"
end

desc 'Run jenkins tests'
task :jenkins => ["install_bundle", "ci:setup:rspec", "spec"]
