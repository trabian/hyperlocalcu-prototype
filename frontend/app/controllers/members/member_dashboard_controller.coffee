# The Member Timeline Controller is the main controller for the member timeline

class App.controller.MemberDashboard extends App.controller.Timeline

  initialize: (options) ->

    super(options)

    this.bind 'select', @showEventDetail
    this.bind 'unselect', @hideEventDetail

    @timeline = new App.view.MemberTimeline
      collection: @events

    @accountView = new App.view.Account
      model: @account

    $('#sidebar').prepend @accountView.render().el

  showEventDetail: (event) =>

    @detail_views ||=
      atm: App.view.AtmDetail
      branch: App.view.BranchDetail
      billpay: App.view.BillpayDetail
      card: App.view.CardDetail
      check: App.view.CheckDetail

    detail_view_class = @detail_views[event.get('event_type')] || App.view.EventDetail

    @detailView = new detail_view_class
      model: event
      el: $('#event-detail-view')

    @detailView.render()

  hideEventDetail: (event) =>
    @detailView.hide()

