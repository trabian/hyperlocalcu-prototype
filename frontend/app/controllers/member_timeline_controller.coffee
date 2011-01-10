# The Member Timeline Controller is the main controller for the member timeline
define ["app/views/timeline/member_timeline", "app/views/timeline/events/detail", "app/models/event_list"], (MemberTimeline, EventDetailView, EventList) ->

  class MemberTimelineController extends Backbone.Controller

    initialize: (options) ->

      this.setupEventList()
      this.setupTimeline()

      # Optionally fetch as the final step of initialization
      this.fetch() if options.fetchOnInit == true

    routes:
      "events/:event_id": 'selectEvent'

    setupEventList: =>
      @events = new EventList

      @events.bind 'change:selected', @changeSelected

      @events.bind 'unselect', =>
        this.saveLocation ''

    setupTimeline: =>
      @timeline = new MemberTimeline(@events)

    fetch: =>

      @events.fetch
        success: ->

          $('#timeline-loading').hide()
          $('#timeline').show()

          Backbone.history.start()

    # Change the selected event and either show or hide the Detail view
    # based on whether the event is selected.
    changeSelected: (event) =>

      if event.get('selected')
        this.saveLocation "events/#{event.id}"
        this.showEventDetail event
      else
        @detailView.hide()

    showEventDetail: (event) =>

      @detailView = new EventDetailView
        model: event
        el: $('#event-detail-view')

      @detailView.render()

