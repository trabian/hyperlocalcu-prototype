module ModelExtensions

  module Publication

    extend ActiveSupport::Concern

    def publish(event, object = self)

      Juggernaut.publish(["monitor", channel_name], { :event => event, :object => object.as_json })

    end

    def channel_name
      "/#{self.class.name.tableize.pluralize}/#{self.id}"
    end
    private :channel_name

  end

end

