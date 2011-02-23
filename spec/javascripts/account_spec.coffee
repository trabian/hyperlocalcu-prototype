require '/assets/timeline.js'

describe 'an account with subaccounts', ->

  beforeEach ->
    @account = new App.model.Account
      id: 1
      number: '1234'
      subaccounts: [
        {
          id: 1
          name: "Rewards Checking"
          balance: 1234.56
          suffix: '11'
          type: 'share'
        },
        {
          id: 2
          name: "Share Savings Account"
          balance: 12.34
          suffix: '10'
          type: 'share'
        },
        {
          id: 3
          name: "Signature Loan"
          balance: -1234.56
          suffix: '12'
          type: 'loan'
        },
        {
          id: 4
          name: "Second Mortgage"
          balance: -50012.34
          suffix: '13'
          type: 'loan'
        },
        {
          id: 5
          name: "Auto Loan"
          balance: -6543.21
          suffix: '14'
          type: 'loan'
        }
      ]

  it "should be able to access its subaccounts as a list", ->
    expect(@account.subaccounts.length).toEqual(5)

  it "should be able to access its share accounts as a list", ->
    expect(@account.shares.length).toEqual(2)

  it "should be able to access its loan accounts as a list", ->
    expect(@account.loans.length).toEqual(3)
