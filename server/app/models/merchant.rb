class Merchant

  include Mongoid::Document

  field :name
  embeds_many :offers

end
