var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/item'], function(Item) {
  var ItemList;
  ItemList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(ItemList, Backbone.Collection);
  ItemList.prototype.model = Item;
  ItemList.prototype.url = '/items.json';
  ItemList.prototype.clear = function() {
    return this.remove(this.models);
  };
  return new ItemList();
});