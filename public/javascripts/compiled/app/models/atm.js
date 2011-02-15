var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Atm = (function() {
  function Atm() {
    this.url = __bind(this.url, this);;    Atm.__super__.constructor.apply(this, arguments);
  }
  __extends(Atm, App.model.FeedbackSubject);
  Atm.prototype.initialize = function(options) {
    options.list_url = "/atms/" + this.id + "/feedbacks";
    this.meta = "ATM #" + this.id;
    return Atm.__super__.initialize.call(this, options);
  };
  Atm.prototype.url = function() {
    return "/atms/" + this.id;
  };
  return Atm;
})();
App.model.FeedbackSubjectFactory.atm = App.model.Atm;