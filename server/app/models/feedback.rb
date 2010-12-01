class Feedback

  include Mongoid::Document
  include Mongoid::Timestamps
  include ModelExtensions::Serialization

  field :response, :type => Hash

  embedded_in :item, :inverse_of => :feedback

end
