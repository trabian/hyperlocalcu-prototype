class Feedback

  include Mongoid::Document
  include Mongoid::Timestamps
  include ModelExtensions::Serialization

  field :response, :type => Hash

  embedded_in :item, :inverse_of => :feedback

  set_callback(:create, :after) do |feedback|
    feedback.item.merchant.publish('add:feedback', feedback)
  end

end
