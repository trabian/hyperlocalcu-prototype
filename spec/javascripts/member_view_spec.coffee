require '/assets/timeline.js'

describe 'a member view with accounts', ->

  template "main_and_sidebar.html"

  describe 'and multiple share and loan accounts', ->

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
                balance: -3012.34
                suffix: '14'
                account_type: 'loan'
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
        model: @member.accounts.current()

      $('#test #sidebar').append @view.render().el

    it 'should show the current primary account number', ->

      expect($('#accounts .account-number').html()).toEqual('#1234')

    xit 'should change the current primary account number when a different account is selected', ->

      expect($('#accounts .account-number').html()).toEqual('#1234')

      @member.accounts.selectOne @member.accounts.get(2)

      expect($('#accounts .account-number').html()).toEqual('#2341')

    it "should show the current account's subshares split by share and loan", ->

      expect($('#accounts .share-accounts div.subaccount').length).toEqual(2)
      expect($('#accounts .loan-accounts div.subaccount').length).toEqual(3)

  describe 'and only share accounts', ->

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
                name: "Share Savings Account"
                balance: 12.34
                suffix: '10'
                account_type: 'share'
              }
            ]
          }
        ]

      @view = new App.view.Account
        model: @member.accounts.current()

      $('#test #sidebar').append @view.render().el

    it "shouldn't show the loan account area since there aren't any", ->
      expect($('#accounts .share-accounts').length).toEqual(1)
      expect($('#accounts .loan-accounts').length).toEqual(0)

  describe 'and only loan accounts', ->

    beforeEach ->
      @member = new App.model.Member
        accounts: [
          {
            id: 1
            number: "1234"
            subaccounts: [
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
              }
            ]
          }
        ]

      @view = new App.view.Account
        model: @member.accounts.current()

      $('#test #sidebar').append @view.render().el

    it "shouldn't show the share account area since there aren't any", ->
      expect($('#accounts .share-accounts').length).toEqual(0)
      expect($('#accounts .loan-accounts').length).toEqual(1)
