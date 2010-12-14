class Merchant

  include Mongoid::Document
  include ModelExtensions::Publication
  include ModelExtensions::Serialization

  field :name
  field :social, :type => Hash
  field :sales, :type => Array
  field :avatar

  embeds_many :offers
  embeds_many :locations

  references_many :items

  # Obviously this isn't efficient for a real system.
  def feedbacks
    items.where(:feedback.exists => true).collect(&:feedback).compact.sort_by { |feedback| feedback.created_at }
  end

end
