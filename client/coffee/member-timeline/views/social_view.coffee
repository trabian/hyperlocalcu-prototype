define ["vendor/jquery-tweet", "vendor/jquery-timeago", "text!views/member-timeline/social.handlebars?v=2", "text!views/social/facebook/post.handlebars?v=1", "vendor/date"], (jquery_tweet, jquery_timeago, template, facebookPostTemplate) ->

  class SocialView extends Backbone.View

    tagName: 'div'

    className: 'social'

    events:
      'click .security a': 'showSecurityMessage'
    
    template: Handlebars.compile(template)

    facebookPostTemplate: Handlebars.compile(facebookPostTemplate)

    initialize: (options) ->
      @socialSettings = options.socialSettings

    render: =>

      $(@el).html @template(@socialSettings)

      if @socialSettings.twitter
        this.renderTwitter(@socialSettings.twitter)

      if @socialSettings.facebook
        this.renderFacebook(@socialSettings.facebook)

      return this

    renderTwitter: (twitterSettings)=>
      this.$('.twitter .latest-tweet').tweet
        username: twitterSettings.username
        count: 1
        broadcast_only: true

    renderFacebook: (facebookSettings)=>

      $.getJSON "https://graph.facebook.com/#{facebookSettings.username}/posts?limit=1&callback=?", (response) =>

        post = response.data[0]
       
        post.date = $.timeago(post.created_time)

        post.username = facebookSettings.username

        this.$('.facebook .latest-post').html @facebookPostTemplate(post)

    showSecurityMessage: =>
      alert "Eventually link to details about how we maintain privacy"



