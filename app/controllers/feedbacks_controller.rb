class FeedbacksController < ApplicationController

  inherit_resources

  respond_to :json, :html

  belongs_to :event, :merchant, :optional => true

  has_scope :from_other_members

protected

  def build_resource

    parent.feedbacks.build(params[:feedback]).tap do |feedback|

      if params[:subject]
        subject_class = params[:subject][:key].classify.constantize
        feedback.subject = subject_class.find(params[:subject][:id])
      end

    end

  end

end
