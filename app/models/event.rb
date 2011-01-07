class Event < ActiveRecord::Base

  belongs_to :account

  validates :account_id, :presence => true
  validates :posted_at, :presence => true

  scope :ordered, :order => 'posted_at DESC, id'

  def as_json(options = {})

    if options.key?(:methods)
      options[:methods] = [options[:methods], :event_type].uniq.flatten
    else
      options[:methods] = :event_type
    end

    super options

  end

  def event_type
    type.underscore.gsub(/_event$/, '')
  end

end
