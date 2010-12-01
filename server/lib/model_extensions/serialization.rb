module ModelExtensions

  module Serialization

    extend ActiveSupport::Concern

    included do

      alias_method :_id, :id

    end

    def serializable_hash(options = nil)

      options ||= {}

      if options[:except].blank?
        options[:except] = ["_id"]
      else
        options[:except] << "_id"
      end

      if options[:methods].blank?
        options[:methods] = ["id"]
      else
        options[:methods] << "id"
      end

      super options

    end

  end

end
