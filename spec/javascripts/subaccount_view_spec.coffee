require '/assets/timeline.js'

describe 'a subaccount view', ->

  beforeEach ->
    @subaccount = new App.model.Subaccount
      id: 1
      name: "Rewards Checking"
      balance: 1234.56
      accountNumber: '1234'
      suffix: '56'
      availableBalance: 1230.00

    @subaccount.account = new App.model.Account
      number: '1234'

    @subaccount

    @view = new App.view.Subaccount
      model: @subaccount
      id: "subaccount-1"

    $('#test').append @view.render().el

  it "should show the balance", ->
    expect($('#subaccount-1 .balance').text()).toEqual('$1,234.56')

  it "should show the available balance", ->
    expect($('#subaccount-1 .available-balance').text()).toEqual('$1,230.00')

  it "should show the available balance only if different from the balance", ->

    @subaccountWithMatchingBalances = new App.model.Subaccount
      id: 1
      name: "Rewards Checking"
      balance: 1234.56
      availableBalance: 1234.56

    @view2 = new App.view.Subaccount
      model: @subaccountWithMatchingBalances
      id: "subaccount-2"

    $('#test').append @view2.render().el

    expect($('#subaccount-2 .available-balance').length).toEqual(0)

  it "should show the combined account number", ->
    expect($('#subaccount-1 .subaccount-number').text().trim()).toEqual("1234-56")
