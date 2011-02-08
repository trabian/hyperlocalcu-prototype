class AccountsController < ApplicationController

  before_filter :authenticate_user!

  inherit_resources

  def index

    redirect_to account_events_path(current_user.member.accounts.first)
    
  end

end
