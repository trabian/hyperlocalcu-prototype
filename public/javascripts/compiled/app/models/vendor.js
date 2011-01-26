var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback_subject'], function(FeedbackSubject) {
  var Vendor;
  return Vendor = (function() {
    function Vendor() {
      this.url = __bind(this.url, this);;      Vendor.__super__.constructor.apply(this, arguments);
    }
    __extends(Vendor, FeedbackSubject);
    Vendor.prototype.initialize = function(options) {
      options.list_url = "/vendors/" + this.id + "/feedbacks";
      this.meta = "Vendor #" + this.id;
      return Vendor.__super__.initialize.call(this, options);
    };
    Vendor.prototype.url = function() {
      return "/vendors/" + this.id;
    };
    return Vendor;
  })();
});