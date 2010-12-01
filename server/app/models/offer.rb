class Offer

  include Mongoid::Document
  include ModelExtensions::Serialization

  field :name
  field :amount
  field :template
  field :options, :type => Hash

  embedded_in :merchant, :inverse_of => :offers

end
