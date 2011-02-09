class Event < ActiveRecord::Base

  belongs_to :account

  validates :account_id, :presence => true
  validates :posted_at, :presence => true

  has_many :feedbacks

  scope :ordered, :order => 'posted_at DESC, id'

  def as_json(options = {})

    if options.key?(:methods)
      options[:methods] = [options[:methods], :event_type, :feedbacks].uniq.flatten
    else
      options[:methods] = [:event_type, :feedbacks]
    end

    super options

  end

  def event_type
    type.underscore.gsub(/_event$/, '')
  end


  def member_name
    self.try(:account).try(:member).short_name
  end

  def self.inherited(child)
    child.instance_eval do
      def model_name
        Event.model_name
      end
    end
    super
  end

end
