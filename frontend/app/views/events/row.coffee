class App.view.EventRow extends Backbone.View

  events:
    click: "selectOne"

  tagName: 'tr'

  className: 'withdrawal'

  initialize: ->

    @template = App.templates['events/row']

    @model.bind 'change:selected', @changeSelection

    @model.bind 'change', @onChange

    this.render()

  render: ->

    $(@el).html @template(@model.toViewJSON())

    return this

  # Change the 'selected' class for the row without re-rendering.
  changeSelection: =>
    $(@el).toggleClass 'selected', @model.get('selected')

  onChange: =>

    attributesToIgnore = ['selected']

    changedKeys = _.keys(@model.changedAttributes())

    return if _.isEmpty(_.without(changedKeys, attributesToIgnore...))

    this.render()

  # If the model is selected, unselect it.  Otherwise if this view is
  # part of a collection then select only this model (by deselecting 
  # all others).  If it's not part of a collection then just select it.
  selectOne: ->
    if @collection?
      @collection.selectOne @model
    else
      @model.toggleSelected()
