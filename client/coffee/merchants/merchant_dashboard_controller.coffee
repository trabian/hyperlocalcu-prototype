define ["merchants/models/merchant", "merchants/models/feedback_list"], (Merchant, FeedbackList) ->

  class MerchantDashboardController extends Backbone.Controller

    initialize: (merchant) ->

      @merchant = merchant

      @feedback_list = new FeedbackList
        merchant: @merchant

      @feedback_list.fetch()

      console.log 'initialized controller with merchant', @merchant, @feedback_list
