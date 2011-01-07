var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/members/statement/row.handlebars?v=1', 'app/views/timeline/event'], function(template, EventView) {
  var StatementRow;
  StatementRow = function() {
    return EventView.apply(this, arguments);
  };
  __extends(StatementRow, EventView);
  StatementRow.prototype.template = Handlebars.compile(template);
  return StatementRow;
});