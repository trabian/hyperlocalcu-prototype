define ["text!views/timeline/events/detail.handlebars?v=3", "vendor/handlebars"], (template) ->

  class EventDetailView extends Backbone.View

    events:
      "click .close": "close"

    template: Handlebars.compile(template)

    close: =>
      @model.set 'selected': false

    render: =>

      $(@el).html @template(@model.toDetailJSON())

      this.show()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()
