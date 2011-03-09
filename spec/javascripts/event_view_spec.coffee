require '/assets/timeline.js'

describe 'the event detail view', ->

  describe 'atm events', ->

    beforeEach ->

      @atmEvent = new App.model.AtmEvent
        id: 1
        amount: 1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "atm"
        atm:
          name: 'Test Atm Event'
          address_summary: '555 Test Street'

      @view = new App.view.EventDetail

      @view.setModel @atmEvent

      @feedbacks = []

      $('#test').append @view.render().el

    it 'should display the latest tweet for the credit union', ->

      expect(@atmEvent.isSocial()).toBeTruthy()
      expect(@atmEvent.twitter_username).toEqual("VantageCU")

      expect(@view.socialView?).toBeTruthy()

    it 'should include the address summary', ->

      expect($('#test .address p')).toHaveText(@atmEvent.get('atm').address_summary)

    it 'should provide a feedback form for the atm', ->

      mostRecentAjaxRequest()?.response
        status: 200
        responseText: JSON.stringify(@feedbacks)

      expect($('#test .address')).toContain('div.rating')

  describe 'billpay events', ->

    beforeEach ->

      @billpayEvent = new App.model.BillpayEvent
        id: 1
        amount: 1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "billpay"
        bill_payment_processing_days: 2
        bill_payment_submitted_date: "2011-01-03T00:00:00Z"
        merchant:
          name: "Duke Energy"
          twitter_username: "DukeEnergyNews"
          address_summary: "555 Test Street"

        vendor:
          name: "iPay Technologies"
          question: "We partner with iPay"

      @view = new App.view.EventDetail

      @view.setModel @billpayEvent

      @feedbacks = []

      $('#test').append @view.render().el

    it 'should display the latest tweet for the merchant', ->

      expect(@billpayEvent.isSocial()).toBeTruthy()
      expect(@billpayEvent.twitter_username).toEqual("DukeEnergyNews")

      expect(@view.socialView?).toBeTruthy()

    it 'should include the address summary', ->

      expect($('#test .address p')).toHaveText(@billpayEvent.get('merchant').address_summary)

    it 'should provide a feedback form for the merchant', ->

      mostRecentAjaxRequest()?.response
        status: 200
        responseText: JSON.stringify(@feedbacks)

      expect($('#test .address')).toContain('div.rating')

    it 'should show information about the bill payment', ->

      expect($('#test')).toContain('.processing-summary')

    it 'should provide a feedback form for the vendor', ->

      mostRecentAjaxRequest()?.response
        status: 200
        responseText: JSON.stringify(@feedbacks)

      expect($('#test .avatar-and-question')).toContain('div.rating')

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
          name: "Test Card Merchant"
          address_summary: "444 Test Street"

    describe 'with a deposit', ->

      beforeEach ->

        @view = new App.view.EventDetail

        @view.setModel @cardDeposit

        $('#test').append @view.render().el

      it "should show the amount", ->
        expect(@view.$('.name-and-amount .amount')).toHaveText('$1,234.56')

      it "should be marked as a deposit", ->
        expect($(@view.el).is('.deposit')).toBeTruthy()

    describe 'with a withdrawal', ->

      beforeEach ->

        @view = new App.view.EventDetail

        @view.setModel @cardWithdrawal

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

      it 'should provide a feedback form for the merchant', ->

        mostRecentAjaxRequest()?.response
          status: 200
          responseText: JSON.stringify(@feedbacks)

        expect($('#test .address')).toContain('div.rating')

  describe 'check events', ->

    beforeEach ->

      @checkEventWithMerchant = new App.model.CheckEvent
        id: 1
        amount: 6543.21
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "check"
        check_image: '/images/test.png'
        check_number: '1234'
        merchant:
          name: "Duke Energy"
          twitter_username: "DukeEnergyNews"
          address_summary: "555 Test Street"

      @checkEventWithoutMerchant = new App.model.CheckEvent
        id: 2
        amount: 1234.56
        posted_at: "2011-01-05T00:00:00Z"
        event_type: "check"
        check_image: '/images/test.png'
        check_number: '1235'

    describe 'with a merchant', ->

      beforeEach ->

        @view = new App.view.EventDetail

        @view.setModel @checkEventWithMerchant

        @feedbacks = []

        $('#test').append @view.render().el

      it 'should display the latest tweet for the merchant', ->

        expect(@checkEventWithMerchant.isSocial()).toBeTruthy()
        expect(@checkEventWithMerchant.twitter_username).toEqual("DukeEnergyNews")

        expect(@view.socialView?).toBeTruthy()

      it 'should include the address summary', ->

        expect($('#test .address p')).toHaveText(@checkEventWithMerchant.get('merchant').address_summary)
        
      it 'should provide a feedback form for the merchant', ->

        mostRecentAjaxRequest()?.response
          status: 200
          responseText: JSON.stringify(@feedbacks)

        expect($('#test .address')).toContain('div.rating')

    describe 'without a merchant', ->

      beforeEach ->

        @view = new App.view.EventDetail

        @view.setModel @checkEventWithoutMerchant

        @feedbacks = []

        $('#test').append @view.render().el

      it 'should show information about the check', ->
        expect($('#test')).toContain('.check-image')
