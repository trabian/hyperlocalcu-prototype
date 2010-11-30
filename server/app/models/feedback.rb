class Feedback

  include Mongoid::Document
  include Mongoid::Timestamps
  include ModelExtensions::Serialization

  field :response, :type => Hash

  embedded_in :item, :inverse_of => :feedback

  set_callback(:create, :after) do |feedback|
    Juggernaut.publish(["monitor", "merchant-#{feedback.item.merchant.id}-feedback"], feedback.to_json)
  end

end
