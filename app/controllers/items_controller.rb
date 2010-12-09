class ItemsController < ApplicationController

  inherit_resources

  has_scope :ordered, :type => :boolean, :default => true

  belongs_to :account

  respond_to :json

end
