require '/assets/timeline.js'

describe 'a member view with accounts', ->

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

    @view = new App.view.MemberDashboard
      model: @member

  it "should pass a spec", ->
    expect(true).toBeTruthy()

  it 'should show the current primary account number', ->
    expect($('#accounts .account-number').html()).toEqual('#1234')

  it "should show the current account's subshares split by share and loan", ->
    expect($('#accounts .share-accounts div.subaccount').length).toEqual(2)
