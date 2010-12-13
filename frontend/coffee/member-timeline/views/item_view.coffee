define ['vendor/handlebars', 'lib/views/rating_view', 'text!views/member-timeline/item.handlebars?v=11'], (handlebars, RatingView, template) ->

  # The ItemView is a representation of a [Timeline Item](item.html).
  class ItemView extends Backbone.View

    events:
      click: "toggleSelectOne"

    # The item view rendered by the template will be wrapped in a tr
    # so it can be inserted into the `tbody` of the timeline view.
    tagName: 'tr'

    # The template referenced here is provided by the `define` call above
    # and will be cached on both client and server.
    #
    # The template is also compiled via Handlebars for faster per-item
    # rendering.  Because this method is called when ItemView is defined
    # and not when it's instantiated, the compilation should only happen
    # once, not once per item.
    template: Handlebars.compile(template)

    # Setup the event bindings and render the view.
    initialize: ->

      @model.bind 'change', @onChange

      @collection = @options.collection

      this.render()

    # Render the compiled template and decorate the surrounding `tr`.
    render: ->

      $(@el).html @template(@model.toViewJSON())

      ratingView = new RatingView
        model: @model

      this.$('td.name').prepend ratingView.render().el

      if @model.get('amount') > 0
        $(@el).addClass('reward')

      return this

    onChange: =>

      onlySelectedChanged = _.keys(@model.changedAttributes()).join('') is 'selected' 

      # No need to re-render the whole item if the only thing changed is the 'selected' field
      if onlySelectedChanged
        this.changeSelection()
      else
        this.render()

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
