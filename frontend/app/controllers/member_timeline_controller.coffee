# The Member Timeline Controller is the main controller for the member timeline
define ["app/views/timeline/member_timeline", "app/models/event_list"], (MemberTimeline, EventList) ->

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

    setupTimeline: =>
      @timeline = new MemberTimeline(@events)

    fetch: =>

      @events.fetch
        success: ->

          $('#timeline-loading').hide()
          $('#timeline').show()

          Backbone.history.start()

