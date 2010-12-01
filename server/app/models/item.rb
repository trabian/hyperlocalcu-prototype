class Item

  include Mongoid::Document
  include ModelExtensions::Serialization

  field :name
  field :timestamp, :type => Date
  field :amount, :type => Float

  scope :ordered, desc(:timestamp)

  referenced_in :merchant

  embeds_one :feedback

end
