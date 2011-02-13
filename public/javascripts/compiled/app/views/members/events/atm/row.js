var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/views/members/events/row'], function(EventRowView) {
  var AtmRow;
  return AtmRow = (function() {
    function AtmRow() {
      AtmRow.__super__.constructor.apply(this, arguments);
    }
    __extends(AtmRow, EventRowView);
    return AtmRow;
  })();
});