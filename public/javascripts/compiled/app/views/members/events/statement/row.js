var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/events/statement/row.handlebars?v=1', 'app/views/members/events/row'], function(template, EventRowView) {
  var StatementRow;
  StatementRow = function() {
    return EventRowView.apply(this, arguments);
  };
  __extends(StatementRow, EventRowView);
  StatementRow.prototype.template = Handlebars.compile(template);
  return StatementRow;
});