var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['lib/models/custom_sync'], function(CustomSync) {
  var Merchant;
  Merchant = function() {
    var _a;
    _a = this;
    this.toUpdateJSON = function(){ return Merchant.prototype.toUpdateJSON.apply(_a, arguments); };
    this.url = function(){ return Merchant.prototype.url.apply(_a, arguments); };
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Merchant, Backbone.Model);
  Merchant.prototype.initialize = function() {
    return (this.sync = CustomSync);
  };
  Merchant.prototype.url = function() {
    return "/merchants/" + (this.id);
  };
  Merchant.prototype.toUpdateJSON = function() {
    return {
      merchant: {
        avatar: this.get('avatar'),
        twitter_username: this.get('twitter_username'),
        facebook_username: this.get('facebook_username')
      }
    };
  };
  return Merchant;
});