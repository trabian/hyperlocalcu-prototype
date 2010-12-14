class Item < ActiveRecord::Base

  belongs_to :account
  belongs_to :merchant

  scope :ordered, :order => 'timestamp DESC, name'

  def as_json(options = {})
    super :include => [:merchant]
  end

end
