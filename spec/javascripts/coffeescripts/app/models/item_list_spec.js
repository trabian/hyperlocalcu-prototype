require({
  baseUrl: "/javascripts/compiled"
}, ["order!lib/underscore", "order!lib/backbone", "order!app/models/item", "order!app/models/item_list"], function(underscore, backbone, Item, ItemList) {
  return describe('ItemList', function() {
    beforeEach(function() {
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
      return (this.items = new ItemList([this.item, this.item_2]));
    });
    it('should know how many items it has', function() {
      return expect(this.items.length).toEqual(2);
    });
    return describe('with a selected item', function() {
      beforeEach(function() {
        return this.item_2.set({
          'selected': true
        });
      });
      it('should know which items are selected', function() {
        return expect(this.items.selected()[0]).toEqual(this.item_2);
      });
      it('should be able to select a single item', function() {
        this.items.selectOne(this.item);
        expect(this.items.selected()[0]).toEqual(this.item);
        expect(this.item.get('selected')).toBeTruthy();
        return expect(this.item_2.get('selected')).toBeFalsy();
      });
      return it('should be able to toggle the selected item', function() {
        this.items.toggleOrSelectOne(this.item);
        expect(this.item.get('selected')).toBeTruthy();
        this.items.toggleOrSelectOne(this.item);
        return expect(this.item_2.get('selected')).toBeFalsy();
      });
    });
  });
});