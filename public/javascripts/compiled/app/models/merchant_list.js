var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.EventMerchant = (function() {
  function EventMerchant() {
    this.toUpdateJSON = __bind(this.toUpdateJSON, this);;    EventMerchant.__super__.constructor.apply(this, arguments);
  }
  __extends(EventMerchant, Backbone.Model);
  EventMerchant.prototype.initialize = function() {
    return this.sync = App.model.CustomSync;
  };
  EventMerchant.prototype.toUpdateJSON = function() {
    return {
      merchant: this.toJSON()
    };
  };
  return EventMerchant;
})();
App.model.MerchantList = (function() {
  function MerchantList() {
    MerchantList.__super__.constructor.apply(this, arguments);
  }
  __extends(MerchantList, Backbone.Collection);
  MerchantList.prototype.url = '/merchants';
  MerchantList.prototype.model = App.model.EventMerchant;
  return MerchantList;
})();