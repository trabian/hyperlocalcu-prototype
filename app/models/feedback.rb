require 'model_extensions/publication'

class Feedback < ActiveRecord::Base

  include ModelExtensions::Publication

  belongs_to :subject, :polymorphic => true

  belongs_to :event

  scope :since, lambda { |time| where('events.posted_at >= ?', time).includes(:event) }

  def as_json(options = {})

    options = {} if options.blank?

    options.merge! :methods => [:subject_key, :member_name, :event_posted_at]

    super options

  end

  def subject_key
    subject_type.try(:underscore)
  end

  def event_posted_at
    event.posted_at
  end

  def member_name
    event.try(:member_name)
  end

  def as_subject_feedback_json

    as_json(:include => { :subject => { :methods => [ :feedback_totals ] }})
    
  end

  set_callback(:create, :after) do |feedback|
    subject.publish('add:feedback', feedback.as_subject_feedback_json)
  end

  set_callback(:update, :after) do |feedback|
    subject.publish('update:feedback', feedback.as_subject_feedback_json)
  end

end
