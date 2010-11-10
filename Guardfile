# A sample Guardfile
# More info at http://github.com/guard/guard#readme

guard 'coffeescript', :output => 'public/javascripts/compiled', :strip_leading_path => 'client/coffee', :nowrap => true do
  watch('^client/coffee/(.*)\.coffee')
end

guard 'coffeescript', :output => 'client/spec/compiled', :strip_leading_path => 'client/spec/coffee', :nowrap => true do
  watch('^client/spec/coffee/(.*)\.coffee')
end

guard 'compass' do
  watch('^client\/sass/(.*)\.s[ac]ss')
end

guard 'bundler' do
  watch('^Gemfile')
end

guard 'shell' do
  watch('^server/(.*)\.rb') do
    `echo "Restarting passenger" && touch tmp/restart.txt`
  end
  watch('^client/vendor/(.*)\.js') do
    `rsync -avz --include "*/" --include "*.js" --exclude "*" client/vendor public/javascripts/compiled`
  end
  watch('^client/views/(.*)\.handlebars') do
    `rsync -avz --include "*/" --include "*.handlebars" --exclude "*" client/views public/javascripts/compiled`
  end
end

guard 'livereload' do
  watch('^public/(.*)\.css')
  watch('^tmp/restart\.txt')
  watch('^server/(.*)\.rb')
end
