class Item

  include Mongoid::Document
  include ModelExtensions::Serialization

  field :name
  field :rating, :type => Integer
  field :timestamp, :type => Date
  field :amount, :type => Float

  scope :ordered, desc(:timestamp)

  referenced_in :merchant
  field :merchant_location_id

  embeds_one :feedback

  def location
    merchant && merchant.locations.find(merchant_location_id)
  end

end
