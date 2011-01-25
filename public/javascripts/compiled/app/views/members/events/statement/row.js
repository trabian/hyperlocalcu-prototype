var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/timeline/events/statement/row.handlebars?v=1', 'app/views/members/events/row'], function(template, EventRowView) {
  var StatementRow;
  return StatementRow = (function() {
    function StatementRow() {
      StatementRow.__super__.constructor.apply(this, arguments);
    }
    __extends(StatementRow, EventRowView);
    StatementRow.prototype.template = Handlebars.compile(template);
    return StatementRow;
  })();
});