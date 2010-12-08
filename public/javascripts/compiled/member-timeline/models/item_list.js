var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['member-timeline/models/item'], function(Item) {
  var ItemList;
  ItemList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(ItemList, Backbone.Collection);
  ItemList.prototype.model = Item;
  ItemList.prototype.url = '/items';
  ItemList.prototype.clear = function() {
    return this.remove(this.models);
  };
  ItemList.prototype.selected = function() {
    return this.filter(function(item) {
      return item.get('selected');
    });
  };
  ItemList.prototype.selectOne = function(item) {
    _.each(this.selected(), function(selectedItem) {
      return selectedItem.set({
        'selected': false
      });
    });
    return item.set({
      'selected': true
    });
  };
  ItemList.prototype.toggleOrSelectOne = function(item) {
    if (item.get('selected')) {

    } else {
      return this.selectOne(item);
    }
  };
  return ItemList;
});