module ModelExtensions

  module FeedbackSubject

    include ModelExtensions::Publication

    extend ActiveSupport::Concern

    included do

      has_many :feedbacks, :as => :subject, :order => 'created_at DESC'

    end

    module InstanceMethods

      def feedback_subject_type
        self.class.model_name.underscore
      end

      def to_feedback_subject_json(options = {})
        ActiveSupport::JSON.encode(as_feedback_subject_json)
      end

      def as_feedback_subject_json(options = {})
        as_json(:include => {:feedbacks => { :methods => [:member_name, :event_posted_at] } }, :methods => [:name, :feedback_totals, :feedback_subject_type])
      end

      def feedback_totals
        {
          :month => feedback_totals_since(Time.now.beginning_of_month),
          :year => feedback_totals_since(Time.now.beginning_of_year)
        }
      end

      def feedback_totals_since(time)
        feedbacks_since = self.feedbacks.since(time)
        {
          :count => feedbacks_since.count,
          :average => feedbacks_since.average(:rating)
        }
      end

    end

  end

end



