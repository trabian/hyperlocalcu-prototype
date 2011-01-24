define ["text!views/common/feedback/timeline/row.handlebars?v=2", 'vendor/handlebars'], (template) ->

  class FeedbackRowView extends Backbone.View

    tagName: 'tr'

    template: Handlebars.compile(template)

    initialize: ->

      this.render()

    render: ->

      $(@el).html @template(@model.toViewJSON())

      return this
