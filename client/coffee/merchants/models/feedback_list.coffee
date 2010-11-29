define ['merchants/models/feedback'], (Feedback) ->

  class FeedbackList extends Backbone.Collection

    model: Feedback

    url: =>
      "/merchants/#{@merchant.id}/feedbacks"

    initialize: (options) =>
      @merchant = options.merchant
      console.log @merchant
      
  
