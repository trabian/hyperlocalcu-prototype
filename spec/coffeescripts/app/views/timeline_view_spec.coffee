require { baseUrl: "/javascripts/compiled" }, ["order!lib/underscore", "order!lib/backbone", "app/models/item", "app/models/item_list", "app/views/timeline_view"], (underscore, backbone, Item, ItemList, TimelineView) ->

  describe 'TimelineView', ->

    beforeEach ->

      @items = new ItemList

      @view = new TimelineView(@items)

      $('#timeline').remove()

      $('body').append('<table id="timeline"><thead></thead><tbody></tbody></table>')

      @view.el = $('#timeline tbody')

      @item = new Item
        name: "Test Item"
        timestamp: "2010-10-28"
        amount: -21.00

      @item_2 = new Item
        name: "Test Item 2"
        timestamp: "2010-10-27"
        amount: -11.32

      @items.add [@item, @item_2]

      @view.addAll()

      @el = $(@view.el)

    afterEach ->

    it "should be able to add multiple rows", ->

      expect(@el.find('tr').length).toEqual(2)

    describe "selection", ->

      it "should unselect any already-selected rows when selecting a different row", ->

        @item.set('selected': true)
        expect(@el.find('tr.selected').length).toEqual(1)

        @items.selectOne @item_2

        expect(@el.find('tr.selected').length).toEqual(1)
