require { baseUrl: "/javascripts/compiled" }, ["order!lib/underscore", "order!lib/backbone", "order!app/views/item_view", "order!app/models/item"], (underscore, backbone, ItemView, Item) ->

  describe 'ItemView', ->

    beforeEach ->

      @item = new Item
        name: "Test Item"
        timestamp: "2010-10-28"
        amount: -21.00

      @view = new ItemView
        model: @item

      @view.render()

      @el = $(@view.el)

    it "should be rendered as a table row", ->
      expect(@el.is('tr')).toBeTruthy()
      
    it "should include the model's name", ->
      expect(@view.$('p.name').text()).toEqual("Test Item")

    describe "positive and negative items", ->

      beforeEach ->

        @item2 = new Item
          name: "Test Item 2"
          timestamp: "2010-10-29"
          amount: 23.00

        @view2 = new ItemView
          model: @item2

        @el2 = $(@view2.el)

      it "should have a special class only if the amount is positive", ->

        expect(@el.is('.reward')).toBeFalsy()
        expect(@el2.is('.reward')).toBeTruthy()

    describe "item selection", ->

      it "shouldn't be selected by default", ->
        expect(@item.get('selected')).toBeFalsy()
        expect(@el.is('.selected')).toBeFalsy()

      it "should have the 'selected' class if it is selected", ->
        @item.set selected: true
        expect(@el.is('.selected')).toBeTruthy()

      it "should become 'selected' on toggleSelected if not already selected", ->
        @view.toggleSelectOne()
        expect(@el.is('.selected')).toBeTruthy()

      it "should become un 'selected' on toggleSelected if already selected", ->
        @item.set selected: true
        expect(@el.is('.selected')).toBeTruthy()
        @view.toggleSelectOne()
        expect(@el.is('.selected')).toBeFalsy()
