uri = URI.parse(Rails.env.production? ? ENV["REDISTOGO_URL"] : 'localhost')

REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password) unless Object.const_defined?("REDIS")
