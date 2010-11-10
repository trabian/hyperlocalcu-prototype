require { baseUrl: "/javascripts/compiled" }, ["order!lib/underscore", "order!lib/backbone", "order!app/timeline"], (underscore, backbone, Timeline) ->

  describe "Timeline", ->

    beforeEach ->

      Timeline.items.clear()

      $('#timeline').remove()
      $('body').append('<table id="timeline"><thead></thead><tbody></tbody></table>')

      # The timeline div didn't exist when we first created the timeline
      # since it was created as part of the test.
      Timeline.timeline.el = $('#timeline tbody')

    it "should add a timeline event to the timeline", ->

      Timeline.items.add
        name: "testing"
        timestamp: "2010-10-28",
        amount: -30.45

      Timeline.items.trigger 'refresh'

      expect($('#timeline tbody tr').length).toEqual(1)
