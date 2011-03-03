require '/assets/timeline.js'

describe 'the event detail view', ->

  describe 'branch events', ->

    beforeEach ->

      @branchEvent = new App.model.BranchEvent
        id: 1
        amount: 1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "branch"
        branch:
          name: 'Test Branch Event'
          address_summary: '555 Test Street'

      @view = new App.view.EventDetail

      @view.setModel @branchEvent

      @feedbacks = []

      $('#test').append @view.render().el

    it 'should display the latest tweet for the credit union', ->

      expect(@branchEvent.isSocial()).toBeTruthy()
      expect(@branchEvent.twitter_username).toEqual("VantageCU")

      expect(@view.socialView?).toBeTruthy()

    it 'should include the address summary', ->

      expect($('#test .address p')).toHaveText(@branchEvent.get('branch').address_summary)

    it 'should provide a feedback form for the branch', ->

      mostRecentAjaxRequest()?.response
        status: 200
        responseText: JSON.stringify(@feedbacks)

      expect($('#test .address')).toContain('div.rating')

  describe 'card events', ->

    beforeEach ->

      @cardDeposit = new App.model.CardEvent
        id: 1
        amount: 1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "card"

      @cardWithdrawal = new App.model.CardEvent
        id: 2
        amount: -1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "card"
        merchant:
          twitter_username: "TestUsername"
          name: "Test Merchant"
          address_summary: "444 Test Street"

    describe 'with a deposit', ->

      beforeEach ->

        @view = new App.view.EventDetail
          model: @cardDeposit

        $('#test').append @view.render().el

      it "should show the amount", ->
        expect(@view.$('.name-and-amount .amount')).toHaveText('$1,234.56')

      it "should be marked as a deposit", ->
        expect($(@view.el).is('.deposit')).toBeTruthy()


    describe 'with a withdrawal', ->

      beforeEach ->

        @view = new App.view.EventDetail
          model: @cardWithdrawal

        $('#test').append @view.render().el

      it "should show the amount", ->
        expect(@view.$('.name-and-amount .amount')).toHaveText('-$1,234.56')

      it "should not be marked as a deposit", ->
        expect($(@view.el).is('.deposit')).toBeFalsy()

      it 'should display the latest tweet for the merchant if available', ->

        expect(@cardWithdrawal.isSocial()).toBeTruthy()
        expect(@cardWithdrawal.twitter_username).toEqual(@cardWithdrawal.get('merchant').twitter_username)

        expect(@view.socialView?).toBeTruthy()

      it 'should include the merchant address summary', ->
        expect($('#test .address p')).toHaveText(@cardWithdrawal.get('merchant').address_summary)

