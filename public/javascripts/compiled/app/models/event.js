var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['lib/models/custom_sync'], function(CustomSync) {
  var Event;
  Event = function() {
    var _a;
    _a = this;
    this.className = function(){ return Event.prototype.className.apply(_a, arguments); };
    this.meta = function(){ return Event.prototype.meta.apply(_a, arguments); };
    this.description = function(){ return Event.prototype.description.apply(_a, arguments); };
    this.formatted_amount = function(){ return Event.prototype.formatted_amount.apply(_a, arguments); };
    this.formatCurrency = function(){ return Event.prototype.formatCurrency.apply(_a, arguments); };
    this.day = function(){ return Event.prototype.day.apply(_a, arguments); };
    this.formatted_timestamp = function(){ return Event.prototype.formatted_timestamp.apply(_a, arguments); };
    this.splitPostedAt = function(){ return Event.prototype.splitPostedAt.apply(_a, arguments); };
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Event, Backbone.Model);
  Event.prototype.initialize = function() {
    return (this.sync = CustomSync);
  };
  Event.prototype.splitPostedAt = function() {
    var _a, date, time;
    _a = this.get('posted_at').split('T');
    date = _a[0];
    time = _a[1];
    return date.split('-');
  };
  Event.prototype.formatted_timestamp = function() {
    var _a, day, month, year;
    _a = this.splitPostedAt();
    year = _a[0];
    month = _a[1];
    day = _a[2];
    return [month, day].join('/');
  };
  Event.prototype.day = function() {
    var _a, day, month, year;
    _a = this.splitPostedAt();
    year = _a[0];
    month = _a[1];
    day = _a[2];
    return [year, month, day].join('-');
  };
  Event.prototype.formatCurrency = function(amount) {
    var sign;
    sign = amount < 0 ? '<span class="sign">-</span>' : '';
    return "" + (sign) + "<span class='currency'>$</span>" + (Math.abs(amount).toFixed(2));
  };
  Event.prototype.formatted_amount = function() {
    return this.formatCurrency(this.get('amount'));
  };
  Event.prototype.depositOrWithdrawal = function() {
    return this.isDeposit() ? "Deposit" : "Withdrawal";
  };
  Event.prototype.isDeposit = function() {
    return this.get('amount') > 0;
  };
  Event.prototype.description = function() {
    return this.depositOrWithdrawal();
  };
  Event.prototype.meta = function() {
    return '';
  };
  Event.prototype.className = function() {
    return this.depositOrWithdrawal().toLowerCase();
  };
  Event.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      description: this.description,
      meta: this.meta,
      html_class: this.html_class,
      formatted_timestamp: this.formatted_timestamp,
      formatted_amount: this.formatted_amount
    });
  };
  return Event;
});