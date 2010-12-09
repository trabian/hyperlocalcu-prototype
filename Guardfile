# More info at http://github.com/guard/guard#readme

# Compile client coffeescripts to public/javascripts/compiled.
guard 'coffeescript', :output => 'public/javascripts/compiled', :strip_leading_path => 'frontend/coffee', :nowrap => true do
  watch('^frontend/coffee/(.*)\.coffee')
end

# Compile spec coffeescripts to client/spec/compiled.
#guard 'coffeescript', :output => 'client/spec/compiled', :strip_leading_path => 'client/spec/coffee', :nowrap => true do
  #watch('^client/spec/coffee/(.*)\.coffee')
#end

# Regenerate public/stylesheets/compiled/screen.css as needed.  The compass
# configuration is in config.rb.
guard 'compass' do
  watch('^frontenc\/sass/(.*)\.s[ac]ss')
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
  watch('^frontend/coffee/(.*)\.coffee') do
    `docco #{Dir.glob('frontend/coffee/**/*.coffee').join(' ')}`
  end

end

# Livereload is a Chrome (and Safari) extension for automatically reloading a
# browser window as needed. The files watched below should trigger a refresh if
# the extension is installed and active.
#guard 'livereload' do
  #watch('^public/(.*)\.css')
  #watch('^tmp/restart\.txt')
  #watch('^server/(.*)\.rb')
#end
