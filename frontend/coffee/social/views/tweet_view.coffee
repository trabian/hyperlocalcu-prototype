define ["vendor/jquery-ui", "vendor/showdown", "text!views/social/twitter/form.handlebars?version=5"], (jqueryUI, showdown, tweetFormTemplate) ->

  # The MerchantView is used to show merchant-specific information
  # such as the current offer.
  class TweetView extends Backbone.View

    # Bind to DOM events within the view
    events:
      "keyup textarea": "updateCount"
      "click button": "submitTweet"

    template: Handlebars.compile(tweetFormTemplate)

    initialize: ->

      @maxChars = 140

      @markdownConverter = new Showdown.converter()

      this.render()

    updateCount: =>

      @count or= this.$('.count')
      @field or= this.$('textarea')
      @button or= this.$('button')
      @form or= this.$('.tweet-form')

      charCount = $.trim(@field.val()).length

      @count.text @maxChars - charCount

      if charCount > @maxChars
        @button.button('disable')
        @form.addClass('over-limit')
      else
        if charCount == 0
          @button.button('disable')
        else
          @button.button('enable')
        @form.removeClass('over-limit')

    render: =>

      tweet =
        message: @options.twitterSettings.default
        prompt: @markdownConverter.makeHtml(@options.twitterSettings.prompt)

      $(@el).html @template(tweet)
      this.$('button').button()

      this.updateCount()

    submitTweet: =>
      unless @button.button('option', 'disabled')
        alert "This doesn't work quite yet.  But it will.  Oh, it will."
