module ModelExtensions

  module Publication

    extend ActiveSupport::Concern

    def publish(event, object = self)
      publish_json(event, object.as_json)
    end

    def publish_json(event, json)
      Pusher[channel_name].trigger(event.to_s, json)
    end

    def channel_name
      URI.escape "#{self.class.name.tableize.pluralize}_#{self.id}"
    end

    private :channel_name

  end

end


