class Feedback < ActiveRecord::Base

  belongs_to :subject, :polymorphic => true

  belongs_to :event

  scope :since, lambda { |time| where('events.posted_at >= ?', time).includes(:event) }

  def as_json(options = {})

    options = { :methods => [:subject_key, :member_name] }

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

end
