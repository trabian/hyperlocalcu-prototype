var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event', 'app/models/atm_event'], function(Event, AtmEvent) {
  var EventList;
  EventList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(EventList, Backbone.Collection);
  EventList.prototype.url = '/accounts/1/events';
  EventList.prototype.event_types = {
    atm: AtmEvent
  };
  EventList.prototype._add = function(model) {
    return EventList.__super__._add.call(this, new this.event_types[model.event_type](model));
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

    } else {
      return this.selectOne(event);
    }
  };
  return EventList;
});