require({
  baseUrl: "/javascripts/compiled"
}, ["order!vendor/underscore", "order!vendor/backbone", "order!member-timeline/views/item_view", "order!member-timeline/models/item"], function(underscore, backbone, ItemView, Item) {
  return describe('ItemView', function() {
    beforeEach(function() {
      this.item = new Item({
        name: "Test Item",
        timestamp: "2010-10-28",
        amount: -21.00
      });
      this.view = new ItemView({
        model: this.item
      });
      this.view.render();
      return (this.el = $(this.view.el));
    });
    it("should be rendered as a table row", function() {
      return expect(this.el.is('tr')).toBeTruthy();
    });
    it("should include the model's name", function() {
      return expect(this.view.$('p.name').text()).toEqual("Test Item");
    });
    describe("positive and negative items", function() {
      beforeEach(function() {
        this.item2 = new Item({
          name: "Test Item 2",
          timestamp: "2010-10-29",
          amount: 23.00
        });
        this.view2 = new ItemView({
          model: this.item2
        });
        return (this.el2 = $(this.view2.el));
      });
      return it("should have a special class only if the amount is positive", function() {
        expect(this.el.is('.reward')).toBeFalsy();
        return expect(this.el2.is('.reward')).toBeTruthy();
      });
    });
    return describe("item selection", function() {
      it("shouldn't be selected by default", function() {
        expect(this.item.get('selected')).toBeFalsy();
        return expect(this.el.is('.selected')).toBeFalsy();
      });
      it("should have the 'selected' class if it is selected", function() {
        this.item.set({
          selected: true
        });
        return expect(this.el.is('.selected')).toBeTruthy();
      });
      it("should become 'selected' on toggleSelected if not already selected", function() {
        this.view.toggleSelectOne();
        return expect(this.el.is('.selected')).toBeTruthy();
      });
      return it("should become un 'selected' on toggleSelected if already selected", function() {
        this.item.set({
          selected: true
        });
        expect(this.el.is('.selected')).toBeTruthy();
        this.view.toggleSelectOne();
        return expect(this.el.is('.selected')).toBeFalsy();
      });
    });
  });
});