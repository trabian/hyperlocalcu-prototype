require({
  baseUrl: "/javascripts/compiled"
}, ["order!lib/underscore", "order!lib/backbone", "order!app/models/item", "app/models/item_list", "order!app/views/merchant_view"], function(underscore, backbone, Item, ItemList, MerchantView) {
  return describe('MerchantView', function() {
    beforeEach(function() {
      this.items = new ItemList();
      $('#merchant-view').remove();
      $('body').append('<div id="merchant-view" style="display: none;"><a href="#" class="close">close</a><div class="content"></div></div>');
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
    return describe("the merchant view with an item already selected", function() {
      beforeEach(function() {
        return this.item.set({
          'selected': 'true'
        });
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