define ["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=2", "member-timeline/views/offer_view"], (jqueryUI, sidebarTemplate, OfferView) ->

  # The MerchantView is used to show merchant-specific information
  # such as the current offer.
  class MerchantView extends Backbone.View

    # Bind to DOM events within the view
    events:
      "click .close": "close"

    template: Handlebars.compile(sidebarTemplate)

    initialize: ->

      # Mix in the Events module for custom event support
      _.extend this, Backbone.Events

    # Unselect the item, thus triggering the changeSelected and hiding the view
    close: =>
      @model.set 'selected': false

    render: =>

      $(@el).html @template(@model.toJSON())

      this.renderMerchantForm()

      # Turn 'close' button into jQuery UI button
      this.$('.close').button
        icons:
          primary: 'ui-icon-close'

      # Advertise the fact that the merchant view is about to be shown.
      this.trigger('show')

      $(@el).show()

    hide: ->

      # Advertise the fact that the merchant view is about to be hidden.
      this.trigger('hide')

      $(@el).empty().hide()

    renderMerchantForm: ->

      merchant = @model.get('merchant')

      if merchant?.offers?

        form = this.make('form')

        $(@el).append(form)

        @offerView = new OfferView
          model: merchant.offers[0]
          el: form

        #require(["text!views/offers/templates/#{offer.template}.handlebars"], (template )->
          #console.l"g('template', template)
