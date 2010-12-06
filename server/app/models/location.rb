class Location

  include Mongoid::Document
  include ModelExtensions::Serialization

  field :name
  field :address
  field :address2
  field :city
  field :state
  field :zip
  field :phone

  embedded_in :merchant, :inverse_of => :locations

end

