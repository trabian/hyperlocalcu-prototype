var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(function() {
  var TimelineController;
  return TimelineController = (function() {
    function TimelineController() {
      this.changeSelected = __bind(this.changeSelected, this);;
      this.fetch = __bind(this.fetch, this);;
      this.selectEvent = __bind(this.selectEvent, this);;      TimelineController.__super__.constructor.apply(this, arguments);
    }
    __extends(TimelineController, Backbone.Controller);
    TimelineController.prototype.initialize = function(options) {
      this.events = options.events;
      this.events.bind('change:selected', this.changeSelected);
      this.events.bind('unselect', __bind(function() {
        return this.saveLocation('');
      }, this));
      this.events.bind('load', __bind(function() {
        $('#timeline-loading').hide();
        $('#timeline').show();
        return Backbone.history.start();
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
        success: __bind(function() {
          return this.events.trigger('load');
        }, this)
      });
    };
    TimelineController.prototype.changeSelected = function(event) {
      if (event.get('selected')) {
        this.trigger('select', event);
        return this.saveLocation("events/" + event.id);
      } else {
        return this.trigger('unselect', event);
      }
    };
    return TimelineController;
  })();
});