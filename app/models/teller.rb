class Teller < ActiveRecord::Base

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  has_many :feedbacks, :as => :subject, :order => 'created_at DESC'

  def name
    [first_name, last_name].join(' ')
  end

  def as_json(options = {})
    super :include => {:feedbacks => { :methods => [:member_name, :event_posted_at] } }, :methods => [:name, :feedback_totals]
  end

  def feedback_totals
    {
      :month => feedback_totals_since(Time.now.beginning_of_month),
      :year => feedback_totals_since(Time.now.beginning_of_year)
    }
  end

  def feedback_totals_since(time)
    feedbacks_since = self.feedbacks.since(time)
    {
      :count => feedbacks_since.count,
      :average => feedbacks_since.average(:rating)
    }
  end

  def count_feedback_this_month
  end

  def average_feedback_this_month
  end

  def average_feedback_this_year
    self.feedbacks.since(Time.now.beginning_of_year).average(:rating)
  end

  def count_feedback_this_year
    self.feedbacks.since(Time.now.beginning_of_year).count
  end

end
