var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['lib/models/custom_sync'], function(CustomSync, Merchant) {
  var Item;
  Item = function() {
    var _a;
    _a = this;
    this.toMerchantJSON = function(){ return Item.prototype.toMerchantJSON.apply(_a, arguments); };
    this.formatted_address = function(){ return Item.prototype.formatted_address.apply(_a, arguments); };
    this.formatted_amount = function(){ return Item.prototype.formatted_amount.apply(_a, arguments); };
    this.formatted_timestamp = function(){ return Item.prototype.formatted_timestamp.apply(_a, arguments); };
    this.toUpdateJSON = function(){ return Item.prototype.toUpdateJSON.apply(_a, arguments); };
    this.addMerchant = function(){ return Item.prototype.addMerchant.apply(_a, arguments); };
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Item, Backbone.Model);
  Item.prototype.initialize = function() {
    this.sync = CustomSync;
    return (this.member = window.member);
  };
  Item.prototype.addMerchant = function(merchant) {
    var params;
    params = {
      url: ("" + (this.url()) + "/add_merchant"),
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        merchant: merchant
      }),
      dataType: 'json',
      processData: false,
      success: __bind(function(resp) {
        return this.set(this.parse(resp));
      }, this)
    };
    return $.ajax(params);
  };
  Item.prototype.toUpdateJSON = function() {
    return {
      item: {
        rating: this.get('rating'),
        name: this.get('name')
      }
    };
  };
  Item.prototype.toggleSelected = function() {
    return this.set({
      selected: !this.get('selected')
    });
  };
  Item.prototype.formatted_timestamp = function() {
    var _a, _b, date, day, month, time, year;
    _a = this.get('timestamp').split('T');
    date = _a[0];
    time = _a[1];
    _b = date.split('-');
    year = _b[0];
    month = _b[1];
    day = _b[2];
    return [month, day].join('/');
  };
  Item.prototype.formatted_amount = function() {
    var sign;
    sign = this.get('amount') < 0 ? '<span class="sign">-</span>' : '';
    return "" + (sign) + "<span class='currency'>$</span>" + (Math.abs(this.get('amount')).toFixed(2));
  };
  Item.prototype.formatted_address = function() {
    var merchant;
    merchant = this.get('merchant');
    if (typeof merchant !== "undefined" && merchant !== null) {
      return merchant.address_summary;
    }
  };
  Item.prototype.toMerchantJSON = function() {
    return _.extend(this.toJSON(), {
      formatted_address: this.formatted_address()
    });
  };
  Item.prototype.toViewJSON = function() {
    var merchant;
    merchant = this.get('merchant');
    return _.extend(this.toJSON(), {
      formatted_timestamp: this.formatted_timestamp,
      formatted_amount: this.formatted_amount
    });
  };
  return Item;
});