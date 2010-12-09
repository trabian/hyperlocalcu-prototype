module ModelExtensions

  module Publication

    extend ActiveSupport::Concern

    def publish(event, object = self)

      puts Pusher.app_id

      Pusher[channel_name].trigger(event.to_s, object.as_json)

      #Juggernaut.publish(["monitor", channel_name], { :event => event, :object => object.as_json })

    end

    def channel_name
      URI.escape "#{self.class.name.tableize.pluralize}_#{self.id}"
    end
    private :channel_name

  end

end

