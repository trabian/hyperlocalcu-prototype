class Merchant

  include Mongoid::Document

  field :name
  field :social, :type => Hash
  field :sales, :type => Array

  embeds_many :offers

  references_many :items

  alias_method :_id, :id

  # Obviously this isn't efficient for a real system.
  def feedbacks
    items.where(:feedback.exists => true).collect(&:feedback).compact.sort_by { |feedback| feedback.created_at }.reverse
  end

end
