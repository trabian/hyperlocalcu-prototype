define ["merchants/models/merchant", "merchants/models/feedback_list", "merchants/views/feedback_list_view"], (Merchant, FeedbackList, FeedbackListView) ->

  class MerchantDashboardController extends Backbone.Controller

    initialize: (options) ->

      @merchant = options.merchant

      @feedbackList = new FeedbackList
        merchant: @merchant

      @feedbackListView = new FeedbackListView(@feedbackList)

      @feedbackList.fetch
        success: ->
          $('#dashboard-loading').hide()
          $('#feedback').show()
