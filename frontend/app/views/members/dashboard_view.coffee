class App.view.MemberDashboard extends Backbone.View

  initialize: (options) ->

    unless @model.accounts.length is 0

      this.render()

      subaccounts = @model.accounts.current().subaccounts

      subaccounts.bind 'selectOne', @renderTimeline

  render: =>

    @accountView = new App.view.Account
      model: @model.accounts.current()

    $('#sidebar').html @accountView.render().el

    
  renderTimeline: (subaccount) =>

    @timelineView = new App.view.AccountTimeline
      model: subaccount

    $('#main .content').html @timelineView.render().el

    subaccount.events.bind 'selectOne', @renderEventDetail

  renderEventDetail: (event) =>

    this.initEventDetailView() unless @eventDetailView?

    @eventDetailView.model = event
    @eventDetailView.maxHeight = $(@timelineView.el).height() - 50

    $('#sidebar').append @eventDetailView.render().el

  initEventDetailView: =>

    $('#sidebar').append this.make('div', { id: 'event-detail-view' })

    @eventDetailView = new App.view.EventDetail
      el: $('#event-detail-view')

    @eventDetailView.bind 'show', =>
      $(@accountView.el).hide()

    @eventDetailView.bind 'hide', =>
      $(@accountView.el).show()

    $(@eventDetailView.el).drawer
      main: $('#main')
      resizeOnInit: false
      resize: (element, height) =>
        @eventDetailView.resize height

    @eventDetailView.bind 'rendered', =>
      $(@eventDetailView.el).drawer('redraw')
