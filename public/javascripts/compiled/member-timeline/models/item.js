var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var Item;
  Item = function() {
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Item, Backbone.Model);
  Item.prototype.toggleSelected = function() {
    return this.set({
      selected: !this.get('selected')
    });
  };
  Item.prototype.formatted_timestamp = function() {
    return this.timestamp ? this.timestamp.split('-').slice(1).join('/') : "";
  };
  Item.prototype.formatted_amount = function() {
    var sign;
    sign = this.amount < 0 ? '<span class="sign">-</span>' : '';
    return "" + (sign) + "<span class='currency'>$</span>" + (Math.abs(this.amount).toFixed(2));
  };
  Item.prototype.toViewJSON = function() {
    var _a, merchant;
    merchant = this.get('merchant');
    return _.extend(this.toJSON(), {
      formatted_timestamp: this.formatted_timestamp,
      formatted_amount: this.formatted_amount,
      offer: (function() {
        if ((typeof merchant !== "undefined" && merchant !== null) && (typeof (_a = merchant.offers) !== "undefined" && _a !== null)) {
          return merchant.offers[0];
        }
      })()
    });
  };
  return Item;
});