require '/assets/timeline.js'

describe 'the event detail view', ->

  beforeEach ->

    @card_deposit = new App.model.Event
      id: 1
      amount: 1234.56
      posted_at: "2011-01-05T00:00:00Z"

    @card_withdrawal = new App.model.Event
      id: 2
      amount: -1234.56
      posted_at: "2011-01-05T00:00:00Z"

  describe 'with a card deposit', ->

    beforeEach ->

      @view = new App.view.EventDetail
        model: @card_deposit

      $('#test').append @view.render().el

    it "should show the amount", ->
      expect(@view.$('.name-and-amount .amount').text()).toEqual('$1,234.56')

    it "should be marked as a deposit", ->
      expect($(@view.el).is('.deposit')).toBeTruthy()

  describe 'with a card withdrawal', ->

    beforeEach ->

      @view = new App.view.EventDetail
        model: @card_withdrawal

      $('#test').append @view.render().el

    it "should show the amount", ->
      expect(@view.$('.name-and-amount .amount').text()).toEqual('-$1,234.56')

    it "should not be marked as a deposit", ->
      expect($(@view.el).is('.deposit')).toBeFalsy()
