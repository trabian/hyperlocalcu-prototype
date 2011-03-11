require 'toystore'
require 'adapter/redis'

module ModelExtensions

  module RedisStore

    extend ActiveSupport::Concern

    included do

      include Toy::Store

      store :redis, REDIS

      def self.include_root_in_json
        false
      end

      identity_map_off

      def self.items_in_set(key)

        store.client.smembers(key).collect do |id|
          store.get(id)
        end

      end

      def self.add_item_to_set(key, id)

        store.client.sadd key, id

      end

    end

  end

end
