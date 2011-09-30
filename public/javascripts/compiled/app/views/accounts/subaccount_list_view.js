var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.SubaccountList = (function() {
  function SubaccountList() {
    this.renderSubaccounts = __bind(this.renderSubaccounts, this);;
    this.render = __bind(this.render, this);;    SubaccountList.__super__.constructor.apply(this, arguments);
  }
  __extends(SubaccountList, Backbone.View);
  SubaccountList.prototype.initialize = function(options) {
    this.template = App.templates['accounts/subaccount_list'];
    return this.collection.bind('selectSubaccounts', __bind(function(selected) {
      return $(this.el).toggleClass('selected', selected);
    }, this));
  };
  SubaccountList.prototype.render = function() {
    $(this.el).html(this.template({
      title: this.options.title,
      total: App.helper.currency.format(this.collection.total())
    }));
    if (this.options.className === 'share-accounts' && this.collection.total() > 4000) {
      this.$('.offer').show();
    }
    this.renderSubaccounts();
    return this;
  };
  SubaccountList.prototype.renderSubaccounts = function() {
    var subaccountList;
    subaccountList = this.$('.subaccounts');
    return this.collection.each(__bind(function(subaccount) {
      var subaccountView;
      subaccount.set({
        'accountNumber': this.model.get('number')
      });
      subaccountView = new App.view.Subaccount({
        collection: this.collection,
        model: subaccount
      });
      return subaccountList.append(subaccountView.render().el);
    }, this));
  };
  return SubaccountList;
})();