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
    this.meta = function(){ return Event.prototype.meta.apply(_a, arguments); };
    this.description = function(){ return Event.prototype.description.apply(_a, arguments); };
    this.formatted_amount = function(){ return Event.prototype.formatted_amount.apply(_a, arguments); };
    this.formatted_timestamp = function(){ return Event.prototype.formatted_timestamp.apply(_a, arguments); };
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Event, Backbone.Model);
  Event.prototype.initialize = function() {
    return (this.sync = CustomSync);
  };
  Event.prototype.formatted_timestamp = function() {
    var _a, _b, date, day, month, time, year;
    _a = this.get('posted_at').split('T');
    date = _a[0];
    time = _a[1];
    _b = date.split('-');
    year = _b[0];
    month = _b[1];
    day = _b[2];
    return [month, day].join('/');
  };
  Event.prototype.formatted_amount = function() {
    var sign;
    sign = this.get('amount') < 0 ? '<span class="sign">-</span>' : '';
    return "" + (sign) + "<span class='currency'>$</span>" + (Math.abs(this.get('amount')).toFixed(2));
  };
  Event.prototype.description = function() {
    return "Test Description";
  };
  Event.prototype.meta = function() {
    return "Test Meta";
  };
  Event.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      description: this.description,
      meta: this.meta,
      formatted_timestamp: this.formatted_timestamp,
      formatted_amount: this.formatted_amount
    });
  };
  return Event;
});