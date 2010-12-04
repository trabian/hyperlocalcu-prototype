define ["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=15", "member-timeline/views/offer_view", "social/views/tweet_view"], (jqueryUI, sidebarTemplate, OfferView, TweetView) ->

  # The MerchantView is used to show merchant-specific information
  # such as the current offer.
  class MerchantView extends Backbone.View

    # Bind to DOM events within the view
    events:
      "click .close": "close"

    template: Handlebars.compile(sidebarTemplate)

    initialize: ->

      @model.bind 'change', @onChange

      # Mix in the Events module for custom event support
      _.extend this, Backbone.Events

    onChange: =>
      this.render() unless 'selected' in _.keys(@model.changedAttributes())

    # Unselect the item, thus triggering the changeSelected and hiding the view
    close: =>
      @model.set 'selected': false

    render: =>

      $(@el).html @template(@model.toMerchantJSON())

      # Disable the feedback form temporarily
      #if @model.get('feedback')

        #twitterSettings = @model.get('merchant')?.social?.twitter

        #if twitterSettings
          #tweetView = new TweetView
            #el: this.$('.tweet-feedback')
            #twitterSettings: twitterSettings

      #else
        #this.renderMerchantForm()

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

        form = this.make 'form',
          action: "/items/#{@model.id}/feedback"
          method: 'post'
          class: 'offer'

        methodInput = this.make 'input',
          type: "hidden"
          name: "_method"
          value: "put"

        $(form).append methodInput

        $(@el).append form

        @offerView = new OfferView
          model: merchant.offers[0]
          el: form
          item: @model
