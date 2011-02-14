class EventsController < ApplicationController

  before_filter :authenticate_user!

  inherit_resources

  respond_to :json, :html

  belongs_to :account

  has_scope :ordered_with_limit, :type => :boolean, :default => true

  def add_merchant

    resource.merchant = Merchant.create(params[:merchant])

    resource.save

    render :json => resource

  end

end
