class Event < ActiveRecord::Base

  belongs_to :account

  validates :account_id, :presence => true
  validates :posted_at, :presence => true

  scope :ordered, :order => 'posted_at DESC, id'

  scope :since, lambda { |time| where('posted_at >= ?', time) }

  def as_json(options = {})

    if options.key?(:methods)
      options[:methods] = [options[:methods], :event_type, :vendor].uniq.flatten
    else
      options[:methods] = [:event_type, :vendor]
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

end
