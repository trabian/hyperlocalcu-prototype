class Merchant

  include Mongoid::Document

  field :name
  field :social, :type => Hash

  embeds_many :offers

  references_many :items

  alias_method :_id, :id

  # Obviously this isn't efficient for a real system.
  def feedbacks
    items.where(:feedback.exists => true).collect(&:feedback).sort_by { |item| item.created_at }.reverse
  end

end
