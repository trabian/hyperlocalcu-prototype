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
          account_type: 'share'
        },
        {
          id: 2
          name: "Share Savings Account"
          balance: 12.34
          suffix: '10'
          account_type: 'share'
        },
        {
          id: 3
          name: "Signature Loan"
          balance: -1234.56
          suffix: '12'
          account_type: 'loan'
        },
        {
          id: 4
          name: "Second Mortgage"
          balance: -50012.34
          suffix: '13'
          account_type: 'loan'
        },
        {
          id: 5
          name: "Auto Loan"
          balance: -6543.21
          suffix: '14'
          account_type: 'loan'
        }
      ]

  it "should be able to access its subaccounts as a list", ->
    expect(@account.subaccounts.length).toEqual(5)

  it "should be able to access its share accounts as a list", ->
    expect(@account.shares.length).toEqual(2)

  it "should be able to access its loan accounts as a list", ->
    expect(@account.loans.length).toEqual(3)

  it 'should allow a subaccount to be selected', ->

    expect(@account.subaccounts.current()).toBeFalsy()

    @account.subaccounts.selectOne(@account.subaccounts.get(2))

    expect(@account.subaccounts.current().get('id')).toEqual(2)

  it 'should trigger a selectOne event once for each account type', ->

    @triggerCount = 0
    @shareSelected = false
    @loanSelected = true

    @account.shares.bind 'selectSubaccounts', (selected) =>
      @triggerCount++
      @shareSelected = selected

    @account.loans.bind 'selectSubaccounts', (selected) =>
      @triggerCount++
      @loanSelected = selected

    @account.subaccounts.selectOne(@account.subaccounts.get(2))

    expect(@triggerCount).toEqual(2)
    expect(@shareSelected).toBeTruthy()
    expect(@loanSelected).toBeFalsy()
