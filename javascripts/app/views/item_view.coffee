define ['lib/handlebars'], ->

  class ItemView extends Backbone.View

    tagName: 'tr'

    template: Handlebars.compile('<td class="date"><span>{{ formatted_timestamp }}<span></td><th>{{ name }}</th><td class="amount">{{ formatted_amount }}</td>')

    initialize: ->

      _.bindAll this, 'render'

    render: ->

      $(this.el).html this.template(this.model.toViewJSON())

      this.addRowClass()

      return this

    addRowClass: ->

      $(this.el).addClass 'selected' if this.model.get('selected')
