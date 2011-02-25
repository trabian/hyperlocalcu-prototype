var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Subaccount = (function() {
  function Subaccount() {
    this.fetchEvents = __bind(this.fetchEvents, this);;    Subaccount.__super__.constructor.apply(this, arguments);
  }
  __extends(Subaccount, Backbone.Model);
  Subaccount.prototype.initialize = function() {
    this.events = new App.model.EventList;
    this.events.url = "/subaccounts/" + this.id + "/events";
    return this.bind('change:selected', this.fetchEvents);
  };
  Subaccount.prototype.fetchEvents = function() {
    if (this.get('selected')) {
      return this.events.fetch();
    }
  };
  Subaccount.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      formattedBalance: App.helper.currency.format(this.get('balance')),
      formattedAvailableBalance: this.get('balance') === this.get('available_balance') ? null : App.helper.currency.format(this.get('available_balance'))
    });
  };
  return Subaccount;
})();