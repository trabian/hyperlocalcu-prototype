class ItemsController < ApplicationController

  inherit_resources

  has_scope :ordered, :type => :boolean, :default => true

  belongs_to :account

  respond_to :json

  def add_merchant

    resource.merchant = Merchant.create(params[:merchant])

    resource.save

    render :json => resource

  end

end
