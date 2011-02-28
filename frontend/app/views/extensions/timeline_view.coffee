App.view.extension.Timeline =

  addAll: ->
    @collection.each @addOne

  addOne: (model, position) ->

    view = this.buildView(model)

    rendered = view.render().el

    if position == 'top'
      @eventContainer.prepend rendered
    else
      @eventContainer.append rendered

    this.addTimestampClass view, model

  # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
  # This allows us to hide them in order to clean up the interface.
  addTimestampClass: (view, event) ->
    $(view.el).addClass('repeat-date') if event.day() is @lastEventDay
    @lastEventDay = event.day()

  refreshTimestamps: =>

    previousDay = null

    @eventContainer.find('tr').each (index, row) =>
      day = $(row).find('>td:first-child').text()
      if day is previousDay
        $(row).addClass('repeat-date')
      else
        $(row).removeClass('repeat-date')
      previousDay = day

  bindTimeline: ->
    _.bindAll(this, "addAll", "addOne", "addTimestampClass", "refreshTimestamps")
