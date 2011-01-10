var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/timeline/events/row'], function(EventRowView) {
  var AtmRow;
  AtmRow = function() {
    return EventRowView.apply(this, arguments);
  };
  __extends(AtmRow, EventRowView);
  return AtmRow;
});