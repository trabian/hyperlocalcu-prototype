class StatementsController < ApplicationController

  before_filter :authenticate_user!

  inherit_resources

  respond_to :json, :html

  belongs_to :subaccount

end
