require '/assets/timeline.js'

describe 'a member dashboard with accounts', ->

  template "main_and_sidebar.html"

  beforeEach ->
    @member = new App.model.Member
      accounts: [
        {
          id: 1
          number: "1234"
          subaccounts: [
            {
              id: 1
              name: "Rewards Checking"
              balance: 1234.56
              suffix: '11'
              account_type: 'share'
            },
            {
              id: 2
              name: "Share Savings"
              balance: 345.23
              suffix: '01'
              account_type: 'share'
            }
          ]
        }
      ]

    @dashboardController = new App.controller.MemberDashboard
      member: @member
      fetchOnInit: true

  it "should allow a subaccount to be selected", ->

    @dashboardController.selectSubaccount(1, 2)

    expect(@member.accounts.current().subaccounts.current().get('id')).toEqual(2)

  it "should fetch the events for a subaccount when one is selected", ->

    @dashboardController.selectSubaccount(1, 1)

    subaccount = @member.accounts.current().subaccounts.current()

    expect(subaccount.events).toBeTruthy()
