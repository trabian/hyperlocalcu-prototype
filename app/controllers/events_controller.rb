class EventsController < ApplicationController

  inherit_resources

  respond_to :json, :html

  belongs_to :account

  has_scope :ordered, :type => :boolean, :default => true

end
