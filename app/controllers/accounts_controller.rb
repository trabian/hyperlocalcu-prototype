class AccountsController < ApplicationController

  # before_filter :authenticate_user!

  inherit_resources

  def index
    
    current_user ||= User.first

    @member = current_user.member

    if current_user.member.accounts.blank?
      head :ok
    else
      redirect_to account_path(current_user.member.accounts.first)
    end
    
  end

end
