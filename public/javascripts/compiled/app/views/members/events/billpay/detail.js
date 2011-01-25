var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/timeline/events/billpay/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], function(template, EventDetailView) {
  var BillpayDetailView;
  return BillpayDetailView = (function() {
    function BillpayDetailView() {
      BillpayDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(BillpayDetailView, EventDetailView);
    BillpayDetailView.prototype.eventTypeTemplate = Handlebars.compile(template);
    return BillpayDetailView;
  })();
});