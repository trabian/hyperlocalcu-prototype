var EventTypeDefinitions, EventTypes;
var __slice = Array.prototype.slice;
EventTypes = ['atm', 'branch', 'billpay', 'check', 'nsf', 'reward', 'statement'];
EventTypeDefinitions = _.map(EventTypes, function(event_type) {
  return "app/models/events/" + (event_type) + "_event";
});
EventTypeDefinitions.unshift('app/models/event');
define(EventTypeDefinitions, function() {
  var EventFactory, event_classes;
  event_classes = __slice.call(arguments, 0);
  EventFactory = function() {};
  EventFactory.prototype.getEvent = function(model) {
    var event_class, index;
    index = _.indexOf(EventTypes, model.event_type) + 1;
    event_class = event_classes[index] || event_classes[0];
    return new event_class(model);
  };
  return new EventFactory();
});