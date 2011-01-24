class Teller < ActiveRecord::Base

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  has_many :feedbacks, :class_name => "Event", :conditions => "teller_rating IS NOT NULL OR teller_comment IS NOT NULL", :order => "posted_at DESC"

  def name
    [first_name, last_name].join(' ')
  end

  def as_json(options = {})
    super :include => {:feedbacks => { :methods => [:member_name]} }, :methods => [:name, :average_feedback_this_month, :average_feedback_this_year, :count_feedback_this_month, :count_feedback_this_year]
  end

  def count_feedback_this_month
    self.feedbacks.since(Time.now.beginning_of_month).count
  end

  def average_feedback_this_month
    self.feedbacks.since(Time.now.beginning_of_month).average(:teller_rating)
  end

  def average_feedback_this_year
    self.feedbacks.since(Time.now.beginning_of_year).average(:teller_rating)
  end

  def count_feedback_this_year
    self.feedbacks.since(Time.now.beginning_of_year).count
  end

end
