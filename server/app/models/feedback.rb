class Feedback

  include Mongoid::Document
  include Mongoid::Timestamps

  field :response, :type => Hash

  embedded_in :item, :inverse_of => :feedback

end
