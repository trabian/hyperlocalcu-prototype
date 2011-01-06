define ['text!views/timeline/members/row.handlebars?v=3', 'vendor/handlebars'], (template) ->

  class EventView extends Backbone.View

    events:
      click: "toggleSelectOne"

    tagName: 'tr'

    template: Handlebars.compile(template)

    initialize: ->

      @model.bind 'change:selected', @changeSelection

      @collection = @options.collection

      this.render()

    render: ->

      $(@el).html @template(@model.toViewJSON())

      if @model.get('amount') > 0
        $(@el).addClass('deposit')

      return this

    # Change the 'selected' class for the row without re-rendering.
    changeSelection: =>
      $(@el).toggleClass 'selected', @model.get('selected')

    # If the model is selected, unselect it.  Otherwise if this view is
    # part of a collection then select only this model (by deselecting 
    # all others).  If it's not part of a collection then just select it.
    toggleSelectOne: ->
      if @collection?
        @collection.toggleOrSelectOne @model
      else
        @model.toggleSelected()
