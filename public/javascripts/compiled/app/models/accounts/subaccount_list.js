var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.SubaccountList = (function() {
  function SubaccountList() {
    SubaccountList.__super__.constructor.apply(this, arguments);
  }
  __extends(SubaccountList, Backbone.Collection);
  SubaccountList.prototype.model = App.model.Subaccount;
  SubaccountList.prototype.total = function() {
    var summer;
    summer = function(memo, num) {
      return memo + num;
    };
    return _.reduce(this.pluck('balance'), summer, 0);
  };
  return SubaccountList;
})();
_.extend(App.model.SubaccountList.prototype, App.model.extension.Selectable);