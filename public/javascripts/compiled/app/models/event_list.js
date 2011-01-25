var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/event_factory'], function(factory) {
  var EventList;
  return EventList = (function() {
    function EventList() {
      EventList.__super__.constructor.apply(this, arguments);
    }
    __extends(EventList, Backbone.Collection);
    EventList.prototype.url = '/accounts/1/events';
    EventList.prototype._add = function(model) {
      return EventList.__super__._add.call(this, factory.getEvent(model));
    };
    EventList.prototype.clear = function() {
      return this.remove(this.models);
    };
    EventList.prototype.selected = function() {
      return this.filter(function(event) {
        return event.get('selected');
      });
    };
    EventList.prototype.selectOne = function(event) {
      _.each(this.selected(), function(selectedevent) {
        return selectedevent.set({
          'selected': false
        });
      });
      return event.set({
        'selected': true
      });
    };
    EventList.prototype.toggleOrSelectOne = function(event) {
      if (event.get('selected')) {
        ;
      } else {
        return this.selectOne(event);
      }
    };
    return EventList;
  })();
});