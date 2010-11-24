var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['merchants/models/merchant'], function(Merchant) {
  var MerchantList;
  MerchantList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(MerchantList, Backbone.Collection);
  MerchantList.prototype.model = Merchant;
  MerchantList.prototype.url = '/merchants';
  return MerchantList;
});