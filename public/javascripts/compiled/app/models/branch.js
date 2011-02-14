var Branch;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Branch = (function() {
  function Branch() {
    this.url = __bind(this.url, this);;    Branch.__super__.constructor.apply(this, arguments);
  }
  __extends(Branch, FeedbackSubject);
  Branch.prototype.initialize = function(options) {
    options.list_url = "/branches/" + this.id + "/feedbacks";
    this.meta = "Branch #" + this.id;
    return Branch.__super__.initialize.call(this, options);
  };
  Branch.prototype.url = function() {
    return "/branches/" + this.id;
  };
  return Branch;
})();
EventFactory.branch = BranchEvent;