class TwitterController < ApplicationController

  def show
    render :json => Tweets.latest(params[:id])
  end
  
end
