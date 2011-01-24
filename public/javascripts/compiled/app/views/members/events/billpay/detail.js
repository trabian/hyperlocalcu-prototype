var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/events/billpay/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], function(template, EventDetailView) {
  var BillpayDetailView;
  BillpayDetailView = function() {
    return EventDetailView.apply(this, arguments);
  };
  __extends(BillpayDetailView, EventDetailView);
  BillpayDetailView.prototype.eventTypeTemplate = Handlebars.compile(template);
  return BillpayDetailView;
});