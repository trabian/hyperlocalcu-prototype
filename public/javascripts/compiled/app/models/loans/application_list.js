var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.LoanApplicationList = (function() {
  function LoanApplicationList() {
    LoanApplicationList.__super__.constructor.apply(this, arguments);
  }
  __extends(LoanApplicationList, Backbone.Collection);
  LoanApplicationList.prototype.url = "/loan_applications";
  LoanApplicationList.prototype.model = App.model.LoanApplication;
  return LoanApplicationList;
})();