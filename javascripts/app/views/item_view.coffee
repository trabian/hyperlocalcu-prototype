define ['lib/handlebars', 'text!/templates/item.handlebars?v=2'], (handlebars, template) ->

  class ItemView extends Backbone.View

    events:
      click: "select"

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

      if this.model.get('amount') > 0
        $(this.el).addClass('reward')

    select: ->
      this.model.toggleSelect()
