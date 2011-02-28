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
