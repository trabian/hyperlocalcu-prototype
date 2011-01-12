var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/timeline/events/row', 'app/views/timeline/events/atm/row', 'app/views/timeline/events/statement/row'], function(EventRowView, AtmRow, StatementRow) {
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
      atm: AtmRow,
      statement: StatementRow
    });
  };
  MemberTimeline.prototype.addOne = function(event) {
    var row_view_class, view;
    row_view_class = this.row_views[event.get('event_type')] || EventRowView;
    view = new row_view_class({
      model: event,
      collection: this.events,
      id: event.id,
      className: event.className
    });
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, event);
  };
  MemberTimeline.prototype.addAll = function() {
    return this.events.each(this.addOne);
  };
  MemberTimeline.prototype.addTimestampClass = function(view, event) {
    if (event.day() === this.lastEventDay) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastEventDay = event.day());
  };
  return MemberTimeline;
});