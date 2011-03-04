class Tweets

  def self.latest(*args)

    options = args.extract_options!

    options[:timeout] ||= 5.minutes
    options[:include_replies] ||= false

    username = args[0]

    key = "tweet:#{username}"

    latest_tweet = REDIS.get key

    if latest_tweet.blank?

      tweets = Twitter.user_timeline(username, :trim_user => true, :count => 10)

      if options[:include_replies]
        latest_tweet = tweets.first
      else
        latest_tweet = tweets.find { |tweet| tweet.in_reply_to_user_id_str.blank? }
      end

      latest_tweet = [latest_tweet].to_json

      REDIS.setex key, options[:timeout], latest_tweet

    end

    latest_tweet

  end

end
