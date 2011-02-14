class App.view.Timeline extends Backbone.View

  el: $('#timeline tbody')

  initialize: (options) ->

    @collection.bind 'refresh', @addAll

    unless @collection.isEmpty()
      this.addAll()

    @collection.trigger 'load'

  addAll: =>
    @collection.each @addOne

  addOne: (model, position) =>

    view = @options.rowFactory.build model, @collection

    rendered = view.render().el

    if position == 'top'
      $(@el).prepend rendered
    else
      $(@el).append rendered

    this.addTimestampClass view, model

  refreshTimestamps: =>
    previousDay = null
    this.$('tr').each (index, row) =>
      day = $(row).find('>td:first-child').text()
      if day is previousDay
        $(row).addClass('repeat-date')
      else
        $(row).removeClass('repeat-date')
      previousDay = day

  # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
  # This allows us to hide them in order to clean up the interface.
  addTimestampClass: (view, event) ->
    $(view.el).addClass('repeat-date') if event.day() is @lastEventDay
    @lastEventDay = event.day()
