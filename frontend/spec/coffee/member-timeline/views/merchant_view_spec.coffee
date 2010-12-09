require { baseUrl: "/javascripts/compiled" }, ["order!vendor/underscore", "order!vendor/backbone", "order!member-timeline/models/item", "member-timeline/models/item_list", "order!member-timeline/views/merchant_view"], (underscore, backbone, Item, ItemList, MerchantView) ->

  describe 'MerchantView', ->

    beforeEach ->

      @items = new ItemList

      $('#merchant-view').remove()

      $('body').append('<div id="sidebar"><div id="merchant-view" style="display: none;"><a href="#" class="close">close</a><div class="content"></div></div></div>')

      @view = new MerchantView(@items)

      @view.el = $('#merchant-view')
      @view.delegateEvents()

      @item = new Item
        name: "Test Item"
        timestamp: "2010-10-28"
        amount: -21.00

      @item_2 = new Item
        name: "Test Item 2"
        timestamp: "2010-10-27"
        amount: -11.32

      @items.add [@item, @item_2]

      @el = $(@view.el)

    it "should be hidden by default", ->
      expect(@el.is(':hidden')).toBeTruthy()

    it "should be shown when an item is selected", ->
      @item.set 'selected': 'true'
      expect(@el.is(':visible')).toBeTruthy()

    it "should trigger the view's 'show' event when shown", ->

      shown = false

      @view.bind 'show', ->
        shown = true

      @item.set 'selected': true

      expect(shown).toBeTruthy()

    describe "the merchant view with an item already selected", ->

      beforeEach ->
        @item.set('selected': 'true')

      it "should trigger the view's 'hide' event when hidden", ->

        hidden = false

        @view.bind 'hide', ->
          hidden = true

        @item.set 'selected': false

        expect(hidden).toBeTruthy()

      it "should close when the close button is clicked", ->
        @el.find('.close').click()
        expect(@el.is(':visible')).toBeFalsy()

      it "should unselect the selected item when closed", ->
        expect(@items.selected().length).toEqual(1)
        @el.find('.close').click()
        expect(@items.selected().length).toEqual(0)

      it "should close if the item is unselected", ->
        expect(@el.is(':visible')).toBeTruthy()
        @item.set 'selected': false
        expect(@el.is(':visible')).toBeFalsy()
