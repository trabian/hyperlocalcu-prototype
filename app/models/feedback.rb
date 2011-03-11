class Feedback

  include ModelExtensions::RedisStore

  attribute :rating, Integer

  attribute :event_id, Integer
  attribute :subject_id, Integer
  attribute :subject_type, Symbol

  def self.for_event(event_id)
    items_in_set events_key(event_id)
  end

  def self.for_subject(subject_type, subject_id)
    items_in_set subject_key(subject_type, subject_id)
  end

  def self.events_key(event_id)
    ["events", event_id, "feedbacks"].join(':')
  end

  def self.subject_key(subject_type, subject_id)
    ["subjects", subject_type, subject_id, "feedbacks"].join(':')
  end

protected

  after_create do |feedback|

    if feedback.event_id.present?
      key = Feedback.events_key(feedback.event_id)
      Feedback.add_item_to_set key, feedback.id
    end

    if feedback.subject_type.present?
      key = Feedback.subject_key(feedback.subject_type, feedback.subject_id)
      Feedback.add_item_to_set key, feedback.id
    end

  end

end

#class Feedback

  #include ModelExtensions::Publication

  #belongs_to :subject, :polymorphic => true

  #belongs_to :event

  #scope :since, lambda { |time| where('events.posted_at >= ?', time).includes(:event) }

  #scope :from_other_members, lambda { |member_id| includes(:event => :account).where(['accounts.member_id != ?', member_id]) }

  #def as_json(options = {})

    #options = {} if options.blank?

    #options.merge! :methods => [:subject_key, :member_name, :event_posted_at]

    #super options

  #end

  #def subject_key
    #subject_type.try(:underscore)
  #end

  #def event_posted_at
    #event.posted_at
  #end

  #def member_name
    #event.try(:member_name)
  #end

  #def as_subject_feedback_json

    #as_json(:include => { :subject => { :methods => [ :feedback_totals ] }})
    
  #end

  #set_callback(:create, :after) do |feedback|
    #subject.publish('add:feedback', feedback.as_subject_feedback_json)
  #end

  #set_callback(:update, :after) do |feedback|
    #subject.publish('update:feedback', feedback.as_subject_feedback_json)
  #end

#end
