#define ['text!views/timeline/events/card/detail.handlebars?v=4', 'app/views/members/events/detail', 'app/views/merchants/search_view', 'vendor/handlebars', 'vendor/jquery-colorbox'], (template, EventDetailView, MerchantSearchView) ->

class App.view.CardDetail extends App.view.EventDetail

  initialize: ->
    @model.bind 'change:merchant', @render

  eventTypeOptions:
    template: Handlebars.compile(template)

  renderDetail: =>
    this.$('.receipt-image a').colorbox()
    this.$('.receipt-upload a.upload').button()
    this.addMerchantSearchView() unless @model.get('merchant')?

  addMerchantSearchView: =>
    @merchantSearchView = new App.view.MerchantSearch
      model: @model

    this.$('#event-detail').prepend @merchantSearchView.render().el
