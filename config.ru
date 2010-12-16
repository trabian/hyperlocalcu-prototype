# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)

use Rack::Auth::Basic do |username, password|
  [username, password] == ['techatchery', 'trabian']
end

run Hyperlocalcu::Application
