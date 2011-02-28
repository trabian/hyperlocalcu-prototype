require '/assets/timeline.js'

describe 'an event list', ->

  beforeEach ->
    
    @events = new App.model.EventList [
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

  it "should allow an event to be selected", ->

    expect(@events.get(2).get('selected')).toBeFalsy()

    @events.selectOne(2)

    expect(@events.get(2).get('selected')).toBeTruthy()
