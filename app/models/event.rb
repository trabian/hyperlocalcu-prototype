class Event < ActiveRecord::Base

  belongs_to :account

  validates :amount, :presence => true
  validates :account_id, :presence => true
  validates :posted_at, :presence => true

  scope :ordered, :order => 'posted_at DESC, id'

  def as_json(options = {})

    if options.key?(:methods)
      options[:methods] << :event_type
    else
      options[:methods] = :event_type
    end

    super options

  end

  def event_type
    type.underscore.gsub(/_event$/, '')
  end

end
