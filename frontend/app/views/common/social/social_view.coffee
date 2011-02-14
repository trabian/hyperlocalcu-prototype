#define ["text!views/social/overview.handlebars?v=1", "vendor/jquery-tweet", "vendor/jquery-timeago", "vendor/date", "vendor/handlebars"], (template) ->

class App.view.Social extends Backbone.View

  tagName: 'div'

  className: 'social'

  template: Handlebars.compile(template)

  render: ->

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
