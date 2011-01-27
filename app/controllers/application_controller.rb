class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :add_expires_header

  def add_expires_header
    expires_in 0, :public => true
  end

end
