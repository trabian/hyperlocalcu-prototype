var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/event'], function(Event) {
  var MerchantEvent;
  return MerchantEvent = (function() {
    function MerchantEvent() {
      MerchantEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(MerchantEvent, Event);
    MerchantEvent.prototype.initialize = function() {
      MerchantEvent.__super__.initialize.call(this);
      this.merchant = this.get('merchant');
      if (this.merchant != null) {
        this.description = this.merchant.name;
        return this.twitter_username = this.merchant.twitter_username;
      }
    };
    MerchantEvent.prototype.isSocial = function() {
      return this.twitter_username != null;
    };
    MerchantEvent.prototype.toDetailJSON = function() {
      if (this.merchant != null) {
        return _.extend(this.toViewJSON(), {
          address: this.merchant.address_summary,
          avatar: this.merchant.avatar,
          twitter_username: this.merchant.twitter_username
        });
      } else {
        return MerchantEvent.__super__.toDetailJSON.call(this);
      }
    };
    return MerchantEvent;
  })();
});