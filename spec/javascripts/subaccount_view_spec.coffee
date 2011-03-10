require '/assets/timeline.js'

describe 'a subaccount view', ->

  beforeEach ->
    @subaccount = new App.model.Subaccount
      id: 1
      name: "Rewards Checking"
      balance: 1234.56
      accountNumber: '1234'
      suffix: '56'
      available_balance: 1230.00

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
      available_balance: 1234.56

    @view2 = new App.view.Subaccount
      model: @subaccountWithMatchingBalances
      id: "subaccount-2"

    $('#test').append @view2.render().el

    expect($('#subaccount-2 .available-balance').length).toEqual(0)

  it "should show the combined account number", ->
    expect($('#subaccount-1 .subaccount-number').text().trim()).toEqual("1234-56")

  it "should have a class of 'selected' only when selected", ->

    expect($(@view.el).is('.selected')).toBeFalsy()

    @subaccount.set
      'selected': true

    expect($(@view.el).is('.selected')).toBeTruthy()

  describe 'with statements', ->

    beforeEach ->

      @subaccountWithStatements = new App.model.Subaccount
        id: 2
        name: "Rewards Checking"
        balance: 1234.56
        available_balance: 1234.56
        selected: true
        statements:
          [
            {
              statement_date: "2011-01-31"
              filename: "/images/samples/statement.pdf"
            },
            {
              statement_date: "2010-12-31"
              filename: "/images/samples/statement.pdf"
            },
            {
              statement_date: "2010-11-30"
              filename: "/images/samples/statement.pdf"
            },
            {
              statement_date: "2010-10-31"
              filename: "/images/samples/statement.pdf"
            }
          ]

      @view2 = new App.view.Subaccount
        model: @subaccountWithStatements
        id: "subaccount-2"

      $('#test').append @view2.render().el

    it "should show the available statements", ->
      expect($('#subaccount-2')).toContain('ul.statements')

    it "should show the available statements based on the formatted statement date", ->
      expect($('#subaccount-2 ul.statements li.statement:first-child a')).toHaveText('Jan. 2011')

    it "should only show the first two statements", ->
      expect($('#subaccount-2 ul.statements li.statement').length).toEqual(2)

    it "should only show an 'older' link if there are more than two statements available", ->
      expect($('#subaccount-2 ul.statements')).toContain('a.older')
