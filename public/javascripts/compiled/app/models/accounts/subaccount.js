var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Subaccount = (function() {
  function Subaccount() {
    Subaccount.__super__.constructor.apply(this, arguments);
  }
  __extends(Subaccount, Backbone.Model);
  Subaccount.prototype.initialize = function() {
    this.events = new App.model.EventList;
    this.events.url = "/subaccounts/" + this.id + "/events";
    return this.statements = new App.model.StatementList(this.get('statements'));
  };
  Subaccount.prototype.dailyBalances = function() {
    var balances;
    balances = {};
    this.events.each(function(event) {
      var date, datetime;
      datetime = event.postedDate();
      date = Date.UTC(datetime.getUTCFullYear(), datetime.getUTCMonth(), datetime.getUTCDate());
      if (balances[date] == null) {
        return balances[date] = event.get('balance');
      }
    });
    return _.map(balances, function(value, key) {
      return [parseInt(key), value];
    });
  };
  Subaccount.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      formattedBalance: App.helper.currency.format(this.get('balance')),
      formattedAvailableBalance: this.get('balance') === this.get('available_balance') ? null : App.helper.currency.format(this.get('available_balance'))
    });
  };
  return Subaccount;
})();