# The Member Timeline Controller is the main controller for the member timeline

class App.controller.MemberDashboard extends Backbone.Controller

  initialize: (options) ->

    @member = options.member

    @dashboardView = new App.view.MemberDashboard
      model: @member

    Backbone.history.start()

  routes:
    "accounts/:account_id/subaccounts/:subaccount_id": "selectSubaccount"

  selectSubaccount: (accountId, subaccountId) =>

    account = @member.accounts.get(accountId)

    account.subaccounts.selectOne(subaccountId)
