define ["vendor/jquery-tweet", "vendor/jquery-timeago", "text!views/member-timeline/social.handlebars?v=4", "text!views/social/facebook/post.handlebars?v=1", "vendor/date", "member-timeline/views/social_username_form_view"], (jquery_tweet, jquery_timeago, template, facebookPostTemplate, date, SocialUsernameFormView) ->

  class SocialView extends Backbone.View

    tagName: 'div'

    className: 'social'

    events:
      'click .security a': 'showSecurityMessage'

    initialize: =>

      @model.bind 'change:twitter_username', @renderTwitter
      @model.bind 'change:facebook_username', @renderFacebook
    
    template: Handlebars.compile(template)

    facebookPostTemplate: Handlebars.compile(facebookPostTemplate)

    render: =>

      $(@el).html @template(@model.toJSON())

      twitterForm = new SocialUsernameFormView
        model: @model
        fieldname: 'twitter_username'
        el: this.$('.twitter')

      facebookForm = new SocialUsernameFormView
        model: @model
        fieldname: 'facebook_username'
        el: this.$('.facebook')

      if @model.get('twitter_username')
        this.renderTwitter()

      if @model.get('facebook_username')
        this.renderFacebook()

      this.$('button').button
        icons:
          primary: 'ui-icon-plus'

      return this

    renderTwitter: =>

      username = @model.get('twitter_username')

      this.$('.twitter .latest-tweet').tweet
        username: username
        count: 1
        broadcast_only: true

        time_parser: (time) =>
          $.timeago(time)

        onLoad: (data) =>
          this.$('.twitter .form').remove()
          unless @model.get('avatar')?
            @model.save 'avatar': data[0]?.user?.profile_image_url 

    renderFacebook: =>

      username = @model.get('facebook_username')

      $.getJSON "https://graph.facebook.com/#{username}/posts?limit=1&callback=?", (response) =>

        post = response.data[0]
       
        post.date = $.timeago(post.created_time)

        post.username = username

        this.$('.facebook .latest-post').html @facebookPostTemplate(post)

    showSecurityMessage: =>
      alert "Eventually link to details about how we maintain privacy"



