class Item

  include Mongoid::Document

  field :name
  field :timestamp, :type => Date
  field :amount, :type => Float

  scope :ordered, desc(:timestamp)

  referenced_in :merchant

  embeds_one :feedback

  alias_method :_id, :id

end
