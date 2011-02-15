class App.view.Social extends Backbone.View

  tagName: 'div'

  className: 'social'

  render: ->

    @template = App.templates['common/social/overview']

    $(@el).html @template(@model.toDetailJSON())

    if @model.twitter_username
      this.renderTwitter()

    return this

  renderTwitter: =>

    username = @model.twitter_username

    this.$('.twitter .latest-tweet').tweet
      username: @model.twitter_username
      count: 1
      broadcast_only: true
