require({
  baseUrl: "/javascripts/compiled"
}, ["order!vendor/underscore", "order!vendor/backbone", "order!member-timeline/models/item", "member-timeline/models/item_list", "order!member-timeline/views/merchant_view"], function(underscore, backbone, Item, ItemList, MerchantView) {
  return describe('MerchantView', function() {
    beforeEach(function() {
      this.items = new ItemList();
      $('#merchant-view').remove();
      $('body').append('<div id="sidebar"><div id="merchant-view" style="display: none;"><a href="#" class="close">close</a><div class="content"></div></div></div>');
      this.view = new MerchantView(this.items);
      this.view.el = $('#merchant-view');
      this.view.delegateEvents();
      this.item = new Item({
        name: "Test Item",
        timestamp: "2010-10-28",
        amount: -21.00
      });
      this.item_2 = new Item({
        name: "Test Item 2",
        timestamp: "2010-10-27",
        amount: -11.32
      });
      this.items.add([this.item, this.item_2]);
      return (this.el = $(this.view.el));
    });
    it("should be hidden by default", function() {
      return expect(this.el.is(':hidden')).toBeTruthy();
    });
    it("should be shown when an item is selected", function() {
      this.item.set({
        'selected': 'true'
      });
      return expect(this.el.is(':visible')).toBeTruthy();
    });
    it("should trigger the view's 'show' event when shown", function() {
      var shown;
      shown = false;
      this.view.bind('show', function() {
        return (shown = true);
      });
      this.item.set({
        'selected': true
      });
      return expect(shown).toBeTruthy();
    });
    return describe("the merchant view with an item already selected", function() {
      beforeEach(function() {
        return this.item.set({
          'selected': 'true'
        });
      });
      it("should trigger the view's 'hide' event when hidden", function() {
        var hidden;
        hidden = false;
        this.view.bind('hide', function() {
          return (hidden = true);
        });
        this.item.set({
          'selected': false
        });
        return expect(hidden).toBeTruthy();
      });
      it("should close when the close button is clicked", function() {
        this.el.find('.close').click();
        return expect(this.el.is(':visible')).toBeFalsy();
      });
      it("should unselect the selected item when closed", function() {
        expect(this.items.selected().length).toEqual(1);
        this.el.find('.close').click();
        return expect(this.items.selected().length).toEqual(0);
      });
      return it("should close if the item is unselected", function() {
        expect(this.el.is(':visible')).toBeTruthy();
        this.item.set({
          'selected': false
        });
        return expect(this.el.is(':visible')).toBeFalsy();
      });
    });
  });
});