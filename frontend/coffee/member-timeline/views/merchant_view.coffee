define ["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=17", "member-timeline/views/offer_view", "member-timeline/views/social_view", "member-timeline/views/merchant_search_view", "merchants/models/merchant"], (jqueryUI, sidebarTemplate, OfferView, SocialView, MerchantSearchView, Merchant) ->

  # The MerchantView is used to show merchant-specific information
  # such as the current offer.
  class MerchantView extends Backbone.View

    # Bind to DOM events within the view
    events:
      "click .avatar": "toggleSocial"
      "click .close": "close"

    template: Handlebars.compile(sidebarTemplate)

    initialize: ->

      @model.bind 'change:merchant', @onChange

      # Mix in the Events module for custom event support
      _.extend this, Backbone.Events

    onChange: =>
      this.render() unless 'selected' in _.keys(@model.changedAttributes())

    # Unselect the item, thus triggering the changeSelected and hiding the view
    close: =>
      @model.set 'selected': false

    updateAvatar: =>
      this.$('img.avatar').attr('src', @merchant.get('avatar'))

    render: =>

      $(@el).html @template(@model.toMerchantJSON())

      if @model.get('merchant')?

        unless @model.merchant?
          @model.merchant = new Merchant(@model.get('merchant'))
          @model.merchant.bind 'change:avatar', @updateAvatar

        @merchant = @model.merchant

      if @merchant?
        @socialView = new SocialView
          model: @merchant

        $(@el).append @socialView.render().el

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

      unless (@model.get('merchant')?)
        merchantSearchView = new MerchantSearchView
          model: @model

        $(@el).append merchantSearchView.render().el

    hide: ->

      # Advertise the fact that the merchant view is about to be hidden.
      this.trigger('hide')

      $(@el).empty().hide()

    toggleSocial: =>
      this.$('.social').toggle()

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
