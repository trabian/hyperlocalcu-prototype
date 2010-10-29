class Offer

  include Mongoid::Document

  field :name
  field :url
  field :amount
  field :category

  embedded_in :item, :inverse_of => :offer

end
