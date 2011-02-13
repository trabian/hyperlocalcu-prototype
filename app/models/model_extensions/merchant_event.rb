module ModelExtensions
  
  module MerchantEvent

    extend ActiveSupport::Concern

    included do

      belongs_to :merchant

    end

    module InstanceMethods

      def as_json(options = {})
        super :include => { :merchant => { :methods => [:feedback_subject_type]}}
      end

    end

  end

end
