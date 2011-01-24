define ->

  class TimelineView extends Backbone.View

    el: $('#timeline tbody')

    initialize: (options) ->

      @collection.bind 'refresh', @addAll

      unless @collection.isEmpty()
        this.addAll()
        @collection.trigger 'load'

    addAll: =>
      @collection.each @addOne

    addOne: (model) =>

      view = @options.rowFactory.build model, @collection

      $(@el).append view.render().el

      this.addTimestampClass view, model

    # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
    # This allows us to hide them in order to clean up the interface.
    addTimestampClass: (view, event) ->
      $(view.el).addClass('repeat-date') if event.day() is @lastEventDay
      @lastEventDay = event.day()
