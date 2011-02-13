var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback_subject'], function(FeedbackSubject) {
  var Teller;
  return Teller = (function() {
    function Teller() {
      this.url = __bind(this.url, this);;      Teller.__super__.constructor.apply(this, arguments);
    }
    __extends(Teller, FeedbackSubject);
    Teller.prototype.initialize = function(options) {
      options.list_url = "/tellers/" + this.id + "/feedbacks";
      this.meta = "Teller #" + this.id;
      return Teller.__super__.initialize.call(this, options);
    };
    Teller.prototype.url = function() {
      return "/tellers/" + this.id;
    };
    return Teller;
  })();
});