# The Member Timeline Controller is the main controller for the member timeline
define ["app/views/timeline/member_timeline", "app/views/timeline/events/detail", "app/views/timeline/events/billpay/detail", "app/views/timeline/events/check/detail", "app/models/event_list"], (MemberTimeline, EventDetailView, BillpayDetailView, CheckDetailView, EventList) ->

  class MemberTimelineController extends Backbone.Controller

    initialize: (options) ->

      this.setupEventList()
      this.setupTimeline()

      @detail_views =
        billpay: BillpayDetailView
        check: CheckDetailView

      # Optionally fetch as the final step of initialization
      this.fetch() if options.fetchOnInit == true

    routes:
      "events/:event_id": 'selectEvent'

    selectEvent: (eventId) =>
      @events.selectOne @events.get(eventId)

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

      detail_view_class = @detail_views[event.get('event_type')] || EventDetailView

      @detailView = new detail_view_class
        model: event
        el: $('#event-detail-view')

      @detailView.render()

