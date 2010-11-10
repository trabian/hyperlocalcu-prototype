var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui"], function() {
  var SummaryView;
  SummaryView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(SummaryView, Backbone.View);
  SummaryView.prototype.el = $('#rewards-summary');
  SummaryView.prototype.initialize = function() {
    return this.$('.timeframe span').button({
      icons: {
        primary: 'ui-icon-calendar',
        secondary: "ui-icon-triangle-1-s"
      }
    });
  };
  return SummaryView;
});