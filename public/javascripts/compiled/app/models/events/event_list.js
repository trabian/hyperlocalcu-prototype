var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.EventList = (function() {
  function EventList() {
    EventList.__super__.constructor.apply(this, arguments);
  }
  __extends(EventList, Backbone.Collection);
  EventList.prototype._add = function(model) {
    return EventList.__super__._add.call(this, App.model.EventFactory.getEvent(model));
  };
  EventList.prototype.clear = function() {
    return this.remove(this.models);
  };
  return EventList;
})();
_.extend(App.model.EventList.prototype, App.model.extension.Selectable);