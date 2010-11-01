# A sample Guardfile
# More info at http://github.com/guard/guard#readme

guard 'coffeescript', :output => 'public/javascripts/compiled', :nowrap => true do
  watch('^javascripts/(.*)\.coffee')
end

guard 'coffeescript', :output => 'spec/javascripts', :nowrap => true do
  watch('^spec/coffeescripts/(.*)\.coffee')
end
