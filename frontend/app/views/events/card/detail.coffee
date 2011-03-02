class App.view.CardDetail extends App.view.EventDetail

  initialize: ->
    @model.bind 'change:merchant', @render

  eventTypeOptions:
    templatePath: 'members/events/card/detail'

  renderDetail: =>

    this.$('.receipt-image a').colorbox()
    this.$('.receipt-upload a.upload').button()

    this.addMerchantSearchView() unless @model.get('merchant')?

  addMerchantSearchView: =>

    @merchantSearchView = new App.view.MerchantSearch
      model: @model

    this.$('#event-detail').prepend @merchantSearchView.render().el
