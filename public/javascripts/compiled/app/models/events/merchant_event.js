var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var MerchantEvent;
  MerchantEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(MerchantEvent, Event);
  MerchantEvent.prototype.initialize = function() {
    var _a;
    MerchantEvent.__super__.initialize.call(this);
    this.merchant = this.get('merchant');
    if (typeof (_a = this.merchant) !== "undefined" && _a !== null) {
      this.description = this.merchant.name;
      return (this.twitter_username = this.merchant.twitter_username);
    }
  };
  MerchantEvent.prototype.isSocial = function() {
    var _a;
    return (typeof (_a = this.twitter_username) !== "undefined" && _a !== null);
  };
  MerchantEvent.prototype.toDetailJSON = function() {
    var _a;
    return (typeof (_a = this.merchant) !== "undefined" && _a !== null) ? _.extend(this.toViewJSON(), {
      address: this.merchant.address_summary,
      avatar: this.merchant.avatar,
      twitter_username: this.merchant.twitter_username
    }) : MerchantEvent.__super__.toDetailJSON.call(this);
  };
  return MerchantEvent;
});