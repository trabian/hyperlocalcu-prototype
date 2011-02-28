require '/assets/timeline.js'

describe 'a subaccount', ->

  beforeEach ->
    
    @subaccount1 = new App.model.Subaccount
      id: 1
      suffix: '01'
      name: 'Rewards Checking'
      balance: 1234.56
      account_type: 'share'

    @events = [
      {
        id: 1
        name: "An Event"
        amount: 123.45
        event_type: 'card'
      },
      {
        id: 2
        name: "Another Event"
        amount: 234.56
        event_type: 'card'
      }
    ]

  it "should have an empty event list on initialization", ->

    expect(@subaccount1.events).toBeTruthy()

  # Turned the auto-fetch off for now
  xit "should fetch events when selected", ->

    triggerCount = 0

    @subaccount1.events.bind 'refresh', ->
      triggerCount++

    @subaccount1.set
      selected: true

    mostRecentAjaxRequest().response
      status: 200
      responseText: JSON.stringify(@events)

    expect(triggerCount).toEqual(1)

    expect(@subaccount1.events.length).toEqual(2)

  it "should not fetch events when unselected", ->

    @subaccount1.set {
      selected: true
    }, silent: true

    triggerCount = 0

    @subaccount1.events.bind 'refresh', ->
      triggerCount++

    @subaccount1.set
      selected: false

    mostRecentAjaxRequest()?.response
      status: 200
      responseText: JSON.stringify(@events)

    expect(triggerCount).toEqual(0)
