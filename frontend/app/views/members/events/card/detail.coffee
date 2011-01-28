define ['text!views/timeline/events/card/detail.handlebars?v=4', 'app/views/members/events/detail', 'app/views/merchants/search_view', 'vendor/handlebars', 'vendor/jquery-colorbox'], (template, EventDetailView, MerchantSearchView) ->

  class CardDetailView extends EventDetailView

    eventTypeOptions:
      template: Handlebars.compile(template)

    renderDetail: =>
      this.$('.receipt-image a').colorbox()
      this.$('.receipt-upload a.upload').button()
      this.addMerchantSearchView() unless @model.get('merchant')?

    addMerchantSearchView: =>
      @merchantSearchView = new MerchantSearchView
        model: @model

      this.$('#event-detail').prepend @merchantSearchView.render().el

