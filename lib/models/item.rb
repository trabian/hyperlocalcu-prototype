class Item

  include Mongoid::Document

  field :name
  field :timestamp, :type => Date
  field :amount, :type => Float

  embeds_one :offer

  scope :ordered, desc(:timestamp)

end
