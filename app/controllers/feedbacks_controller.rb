class FeedbacksController < ApplicationController

  inherit_resources

  respond_to :json, :html

  belongs_to :event
  belongs_to :merchant, :optional => true

  has_scope :from_other_members

  def index
    render :json => end_of_association_chain
  end

  def update
    feedback = Feedback.get(params[:id])
    throw params[:feedback].to_json
    throw "new, really?" if feedback.new_record?
    feedback.update_attributes(params[:feedback])
    render :json => feedback
  end

protected

  def build_resource

    Feedback.new(params[:feedback]).tap do |feedback|

      feedback.event_id = params[:event_id]

      if params[:subject]
        feedback.subject_id = params[:subject][:id]
        feedback.subject_type = params[:subject][:key]
      end

    end
    
  end

end
