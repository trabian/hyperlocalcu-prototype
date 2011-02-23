# More info at http://github.com/guard/guard#readme

# Compile client coffeescripts to public/javascripts/compiled.
guard 'coffeescript', :output => 'public/javascripts/compiled/app', :strip_leading_path => 'frontend/app', :nowrap => true do
  watch('^frontend/app/(.*)\.coffee')
end

# Compile spec coffeescripts to client/spec/compiled.
#guard 'coffeescript', :output => 'client/spec/compiled', :strip_leading_path => 'client/spec/coffee', :nowrap => true do
  #watch('^client/spec/coffee/(.*)\.coffee')
#end

# Regenerate public/stylesheets/compiled/screen.css as needed.  The compass
# configuration is in config.rb.
guard 'compass' do
  watch('^frontend\/sass/(.*)\.s[ac]ss')
end

guard 'shell' do

  # Restart Passenger when any of the ruby files within the server directory change.
  #watch('^server/(.*)\.rb') do
    #`echo "Restarting passenger" && touch tmp/restart.txt`
  #end

  # Rsync client/vendor with public/javascripts/compiled/vendor
  watch('^frontend/vendor/(.*)\.js') do
    `rsync -avz --include "*/" --include "*.js" --exclude "*" frontend/vendor public/javascripts/compiled`
  end

  # Rsync handlebars files in client/views with public/javascripts/compiled/views
  watch('^frontend/views/(.*)\.handlebars') do
    `rsync -avz --include "*/" --include "*.handlebars" --exclude "*" frontend/views public/javascripts/compiled`
  end

  # Regenerate the documentation when the coffeescript files are updated. We're
  # globbing the files via Ruby instead of the shell for the sake of
  # consistency.
  #watch('^frontend/app/(.*)\.coffee') do
    #`docco #{Dir.glob('frontend/app/**/*.coffee').join(' ')}`
  #end
  
  watch('^public/javascripts/(.*)\.js') do
    `bundle exec jammit`
  end

  watch('^frontend/app/(.*)\.coffee') do
    `bundle exec jammit`
  end

  watch('^frontend/views/(.*)\.handlebars') do
    `bundle exec jammit`
  end

  #watch('^public/assets/timeline.js') do
    #`echo "Running javascript specs" && rake spec:javascripts`
  #end

  #watch('^spec/javascripts/(.*)\.coffee') do
    #`echo "Running javascript specs" && rake spec:javascripts`
  #end

end

# Livereload is a Chrome (and Safari) extension for automatically reloading a
# browser window as needed. The files watched below should trigger a refresh if
# the extension is installed and active.
#guard 'livereload' do
  #watch('^public/(.*)\.css')
  #watch('^tmp/restart\.txt')
  #watch('^server/(.*)\.rb')
#end
#
guard 'spork' do
  watch('config/application.rb')
  watch('config/environment.rb')
  watch(%r{^config/environments/.*\.rb$})
  watch(%r{^config/initializers/.*\.rb$})
  watch('spec/spec_helper.rb')
end

guard 'rspec', :version => 2, :drb => true, :formatted => 'instafail' do
  watch('^spec/(.*)_spec.rb')
  watch('^lib/(.*)\.rb')                              { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('^spec/spec_helper.rb')                       { "spec" }
  
  # Rails example
  watch('^app/(.*)\.rb')                              { |m| "spec/#{m[1]}_spec.rb" }
  # watch('^lib/(.*)\.rb')                              { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('^config/routes.rb')                          { "spec/routing" }
  watch('^app/controllers/application_controller.rb') { "spec/controllers" }
  watch('^spec/factories.rb')                         { "spec/models" }
end


