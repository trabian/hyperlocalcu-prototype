define ['lib/handlebars', 'text!/templates/item.handlebars'], (handlebars, template) ->

  class ItemView extends Backbone.View

    events:
      "click": "select"

    tagName: 'tr'

    template: Handlebars.compile(template)

    initialize: ->

      _.bindAll this, 'render'

      this.model.bind 'change', this.render

    render: ->

      $(this.el).html this.template(this.model.toViewJSON())

      this.addRowClass()

      return this

    addRowClass: ->
      if this.model.get('selected')
        $(this.el).addClass 'selected'
      else
        $(this.el).removeClass 'selected'

    select: ->
      this.model.select()
