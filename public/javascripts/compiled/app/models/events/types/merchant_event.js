var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.MerchantEvent = (function() {
  function MerchantEvent() {
    this.addMerchant = __bind(this.addMerchant, this);;
    this.loadMerchantAttributes = __bind(this.loadMerchantAttributes, this);;    MerchantEvent.__super__.constructor.apply(this, arguments);
  }
  __extends(MerchantEvent, App.model.Event);
  MerchantEvent.prototype.initialize = function() {
    MerchantEvent.__super__.initialize.call(this);
    this.loadMerchantAttributes();
    return this.bind('change:merchant', this.loadMerchantAttributes);
  };
  MerchantEvent.prototype.isSocial = function() {
    return this.twitter_username != null;
  };
  MerchantEvent.prototype.loadMerchantAttributes = function() {
    this.merchant = this.get('merchant');
    if (this.merchant != null) {
      this.description = this.merchant.name;
      this.twitter_username = this.merchant.twitter_username;
      return this.address_summary = "<h2>" + this.merchant.name + "</h2><p>" + this.merchant.address_summary + "</p>";
    }
  };
  MerchantEvent.prototype.toDetailJSON = function() {
    if (this.merchant != null) {
      return _.extend(this.toViewJSON(), {
        address: this.address_summary,
        avatar: this.merchant.avatar,
        twitter_username: this.merchant.twitter_username
      });
    } else {
      return MerchantEvent.__super__.toDetailJSON.call(this);
    }
  };
  MerchantEvent.prototype.addMerchant = function(merchant) {
    var params;
    merchant.merchant_number = this.get('merchant_number');
    params = {
      url: "" + (this.url()) + "/add_merchant",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        merchant: merchant
      }),
      dataType: 'json',
      processData: false,
      success: __bind(function(resp) {
        var new_merchant;
        new_merchant = this.parse(resp);
        return this.collection.each(function(event) {
          if (event.get('merchant_number') === new_merchant.merchant_number) {
            return event.set(new_merchant);
          }
        });
      }, this)
    };
    return $.ajax(params);
  };
  return MerchantEvent;
})();
App.model.EventFactory.merchant = App.model.MerchantEvent;