require { baseUrl: "/javascripts/compiled" }, ["order!lib/underscore", "order!lib/backbone", "order!app/models/item", "order!app/models/item_list"], (underscore, backbone, Item, ItemList) ->

  describe 'ItemList', ->

    beforeEach ->

      @item = new Item
        name: "Test Item"
        timestamp: "2010-10-28"
        amount: -21.00

      @item_2 = new Item
        name: "Test Item 2"
        timestamp: "2010-10-27"
        amount: -11.32

      @items = new ItemList [@item, @item_2]

    it 'should know how many items it has', ->
      expect(@items.length).toEqual(2)

    it "should trigger the selectItem event when an item is selected", ->

      changedItem = null

      @items.bind 'change:selected', (item)->
        changedItem = item

      @item.set 'selected': true

      expect(changedItem).toEqual(@item)

    describe 'with a selected item', ->

      beforeEach ->
        @item_2.set 'selected': true

      it 'should know which items are selected', ->
        expect(@items.selected()[0]).toEqual(@item_2)

      it 'should be able to select a single item', ->
        @items.selectOne(@item)
        expect(@items.selected()[0]).toEqual(@item)
        expect(@item.get('selected')).toBeTruthy()
        expect(@item_2.get('selected')).toBeFalsy()

      it 'should be able to toggle the selected item', ->
        @items.toggleOrSelectOne(@item)
        expect(@item.get('selected')).toBeTruthy()
        @items.toggleOrSelectOne(@item)
        expect(@item_2.get('selected')).toBeFalsy()
