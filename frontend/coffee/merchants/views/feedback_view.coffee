define ['vendor/handlebars', 'vendor/jquery-timeago', 'text!views/merchants/feedback.handlebars?v=1'], (handlebars, timeago, template) ->

  class FeedbackView extends Backbone.View

    tagName: 'li'

    className: 'feedback'

    template: Handlebars.compile(template)

    initialize: ->
      this.render()

    render: ->

      $(@el).html @template(@model.toJSON())

      this.$('.timestamp').text $.timeago(@model.get('created_at'))

      return this
