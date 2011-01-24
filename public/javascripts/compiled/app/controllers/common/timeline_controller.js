var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var TimelineController;
  TimelineController = function() {
    var _a;
    _a = this;
    this.changeSelected = function(){ return TimelineController.prototype.changeSelected.apply(_a, arguments); };
    this.fetch = function(){ return TimelineController.prototype.fetch.apply(_a, arguments); };
    this.selectEvent = function(){ return TimelineController.prototype.selectEvent.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(TimelineController, Backbone.Controller);
  TimelineController.prototype.initialize = function(options) {
    this.events = options.events;
    this.events.bind('change:selected', this.changeSelected);
    this.events.bind('unselect', __bind(function() {
      return this.saveLocation('');
    }, this));
    if (options.fetchOnInit === true) {
      return this.fetch();
    }
  };
  TimelineController.prototype.routes = {
    "events/:event_id": 'selectEvent'
  };
  TimelineController.prototype.selectEvent = function(eventId) {
    return this.events.selectOne(this.events.get(eventId));
  };
  TimelineController.prototype.fetch = function() {
    return this.events.fetch({
      success: function() {
        $('#timeline-loading').hide();
        $('#timeline').show();
        return Backbone.history.start();
      }
    });
  };
  TimelineController.prototype.changeSelected = function(event) {
    if (event.get('selected')) {
      this.trigger('select', event);
      return this.saveLocation("events/" + (event.id));
    } else {
      return this.trigger('unselect', event);
    }
  };
  return TimelineController;
});