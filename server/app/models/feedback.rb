class Feedback

  include Mongoid::Document

  field :response, :type => Hash

  embedded_in :item, :inverse_of => :feedback

end
