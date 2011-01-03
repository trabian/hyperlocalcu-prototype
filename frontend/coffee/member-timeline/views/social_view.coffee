define ["vendor/jquery-tweet", "vendor/jquery-timeago", "text!views/member-timeline/social.handlebars?v=8", "vendor/date", "member-timeline/views/social_username_form_view"], (jquery_tweet, jquery_timeago, template, date, SocialUsernameFormView) ->

  class SocialView extends Backbone.View

    tagName: 'div'

    className: 'social'

    events:
      'click .security a': 'showSecurityMessage'
      'click a.vote': 'vote'

    initialize: =>

      @model.bind 'change:twitter_username', @renderTwitter
    
    template: Handlebars.compile(template)

    render: =>

      console.log('render model', @model)

      $(@el).html @template(@model.toJSON())

      twitterForm = new SocialUsernameFormView
        model: @model
        fieldname: 'twitter_username'
        el: this.$('.twitter')

      if @model.get('twitter_username')
        this.renderTwitter()

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

    vote: =>
      alert('Voting for a tweet or post will allow good deals to bubble to the top for other members')
      return false

    showSecurityMessage: =>
      alert "Eventually link to details about how we maintain privacy"



