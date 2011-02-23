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
              balance: -3012.34
              suffix: '14'
              type: 'loan'
            }
          ]
        },
        {
          id: 2
          number: "2341"
        }
        {
          id: 3
          number: "3412"
        }
      ]

    @view = new App.view.Account
      collection: @member.accounts

    $('#test #sidebar').append @view.render().el

  it 'should show the current primary account number', ->

    expect($('#accounts .account-number').html()).toEqual('#1234')

  it 'should change the current primary account number when a different account is selected', ->

    expect($('#accounts .account-number').html()).toEqual('#1234')

    @member.accounts.selectOne @member.accounts.get(2)

    expect($('#accounts .account-number').html()).toEqual('#2341')

  it "should show the current account's subshares split by share and loan", ->

    expect($('#accounts .share-accounts div.subaccount').length).toEqual(2)
    expect($('#accounts .loan-accounts div.subaccount').length).toEqual(3)
