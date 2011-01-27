class EventsController < ApplicationController

  inherit_resources

  respond_to :json, :html

  belongs_to :account

  has_scope :ordered, :type => :boolean, :default => true

  before_filter :add_expires_header

  def add_expires_header
    expires_in 0, :public => true
  end

end
