require({
  baseUrl: "/javascripts/compiled"
}, ["order!lib/underscore", "order!lib/backbone", "app/models/item", "app/models/item_list", "app/views/timeline_view"], function(underscore, backbone, Item, ItemList, TimelineView) {
  return describe('TimelineView', function() {
    beforeEach(function() {
      this.items = new ItemList();
      this.view = new TimelineView(this.items);
      $('#timeline').remove();
      $('body').append('<table id="timeline"><thead></thead><tbody></tbody></table>');
      this.view.el = $('#timeline tbody');
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
      this.view.addAll();
      return (this.el = $(this.view.el));
    });
    it("should be able to add multiple rows", function() {
      return expect(this.el.find('tr').length).toEqual(2);
    });
    return describe("selection", function() {
      return it("should unselect any already-selected rows when selecting a different row", function() {
        this.item.set({
          'selected': true
        });
        expect(this.el.find('tr.selected').length).toEqual(1);
        this.item_2.set({
          'selected': true
        });
        return expect(this.el.find('tr.selected').length).toEqual(1);
      });
    });
  });
});