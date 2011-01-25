class Feedback < ActiveRecord::Base

  belongs_to :subject, :polymorphic => true

  belongs_to :event

  def as_json(options = {})

    options = { :methods => [:subject_key] }

    super options

  end

  def subject_key
    subject_type.try(:underscore)
  end

end
