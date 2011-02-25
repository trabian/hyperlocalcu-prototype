class App.view.MemberDashboard extends Backbone.View

  initialize: (options) ->

    this.render()

    @model.accounts.current().subaccounts.bind 'selectOne', @selectSubaccount

  render: =>
    this.renderAccount()

  selectSubaccount: (subaccount) =>

    subaccount.events.unbind 'refresh', @renderTimeline
    subaccount.events.bind 'refresh', @renderTimeline, subaccount

    @renderTimeline
    
  renderTimeline: (subaccount) =>

    timelineView = new App.view.AccountTimeline
      model: subaccount

    $('#main .content').html timelineView.render().el

  renderAccount: =>

    @accountView = new App.view.Account
      model: @model.accounts.current()

    $('#sidebar').html @accountView.render().el
