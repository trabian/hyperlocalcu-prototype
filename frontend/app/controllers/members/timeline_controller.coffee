# The Member Timeline Controller is the main controller for the member timeline
define ["app/controllers/common/timeline_controller", "app/views/members/member_timeline", "app/views/members/events/detail", "app/views/members/events/billpay/detail", "app/views/members/events/check/detail"], (TimelineController, MemberTimeline, EventDetailView, BillpayDetailView, CheckDetailView) ->

  class MemberTimelineController extends TimelineController

    initialize: (options) ->

      super(options)

      this.bind 'select', @showEventDetail
      this.bind 'unselect', @hideEventDetail

      @timeline = new MemberTimeline
        collection: @events

    showEventDetail: (event) =>

      @detail_views ||=
        billpay: BillpayDetailView
        check: CheckDetailView

      detail_view_class = @detail_views[event.get('event_type')] || EventDetailView

      @detailView = new detail_view_class
        model: event
        el: $('#event-detail-view')

      @detailView.render()

    hideEventDetail: (event) =>
      @detailView.hide()

