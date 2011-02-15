class Event < ActiveRecord::Base

  belongs_to :account

  validates :account_id, :presence => true
  validates :posted_at, :presence => true

  has_many :feedbacks

  scope :ordered, :order => 'events.posted_at DESC, id'

  scope :ordered_with_limit, :order => 'posted_at DESC, id', :limit => 30

  def as_json(options = {})

    if options.key?(:methods)
      options[:methods] = [options[:methods], :event_type, :feedbacks, :vendor].uniq.flatten
    else
      options[:methods] = [:event_type, :feedbacks, :vendor]
    end

    super options

  end

  def event_type
    type.underscore.gsub(/_event$/, '')
  end

  def vendor
    Vendor.find_by_event_type(event_type)
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
