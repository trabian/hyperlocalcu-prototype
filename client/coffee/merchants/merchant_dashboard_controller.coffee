define ["merchants/models/merchant", "merchants/models/feedback_list", "merchants/views/feedback_list_view", "merchants/views/sales_chart_view"], (Merchant, FeedbackList, FeedbackListView, SalesChartView) ->

  class MerchantDashboardController extends Backbone.Controller

    initialize: (options) ->

      @merchant = options.merchant

      @salesChartView = new SalesChartView
        model: @merchant

      @feedbackList = new FeedbackList
        merchant: @merchant

      @feedbackListView = new FeedbackListView(@feedbackList)

      @feedbackList.fetch
        success: ->
          $('#dashboard-loading').hide()
          $('#feedback').show()