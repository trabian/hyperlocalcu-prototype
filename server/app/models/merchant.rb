class Merchant

  include Mongoid::Document

  field :name
  embeds_many :offers

  references_many :items, :stored_as => :array, :inverse_of => :merchant

end
