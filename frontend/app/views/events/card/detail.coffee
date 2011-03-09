class App.view.CardDetail extends App.view.EventDetail

  initialize: ->
    @model.bind 'change:merchant', @render

  render: =>

    $(@el).html App.templates['events/card/detail'](@model.toDetailJSON())

    this.$('.receipt-image a').colorbox()
    this.$('.receipt-upload a.upload').button()

    this.addMerchantSearchView() unless @model.get('merchant')?

    return this

  renderFeedback: =>

    @options.parent.renderLocationFeedbackView 'merchant' if @model.get('merchant')?

  addMerchantSearchView: =>

    @merchantSearchView = new App.view.MerchantSearch
      model: @model

    $(@el).prepend @merchantSearchView.render().el

App.view.EventDetailFactory.card = App.view.CardDetail
