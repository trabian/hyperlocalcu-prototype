var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/timeline/event', 'app/views/timeline/events/atm/row'], function(EventView, AtmRow) {
  var MemberTimeline;
  MemberTimeline = function() {
    var _a;
    _a = this;
    this.addAll = function(){ return MemberTimeline.prototype.addAll.apply(_a, arguments); };
    this.addOne = function(){ return MemberTimeline.prototype.addOne.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MemberTimeline, Backbone.View);
  MemberTimeline.prototype.el = $('#timeline tbody');
  MemberTimeline.prototype.initialize = function(events) {
    this.events = events;
    this.events.bind('refresh', this.addAll);
    return (this.row_views = {
      atm: AtmRow
    });
  };
  MemberTimeline.prototype.addOne = function(event) {
    var view;
    view = new this.row_views[event.get('event_type')]({
      model: event,
      collection: this.events,
      id: event.id
    });
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, event);
  };
  MemberTimeline.prototype.addAll = function() {
    return this.events.each(this.addOne);
  };
  MemberTimeline.prototype.addTimestampClass = function(view, event) {
    if (event.get('posted_at') === this.lastTimestamp) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastTimestamp = event.get('posted_at'));
  };
  return MemberTimeline;
});