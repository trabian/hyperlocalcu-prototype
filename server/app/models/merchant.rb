class Merchant

  include Mongoid::Document

  field :name
  embeds_many :offers

  referenced_in :item

end
