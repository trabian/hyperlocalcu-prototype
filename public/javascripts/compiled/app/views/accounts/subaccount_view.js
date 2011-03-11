var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Subaccount = (function() {
  function Subaccount() {
    this.renderChart = __bind(this.renderChart, this);;
    this.renderStatements = __bind(this.renderStatements, this);;
    this.render = __bind(this.render, this);;    Subaccount.__super__.constructor.apply(this, arguments);
  }
  __extends(Subaccount, Backbone.View);
  Subaccount.prototype.className = 'subaccount';
  Subaccount.prototype.initialize = function(options) {
    this.template = App.templates['accounts/subaccount'];
    this.model.bind('change', this.render);
    return this.model.events.bind('refresh', this.renderChart);
  };
  Subaccount.prototype.render = function() {
    var selected;
    $(this.el).html(this.template(this.model.toViewJSON()));
    selected = this.model.get('selected') === true;
    $(this.el).toggleClass('selected', selected);
    this.renderStatements();
    if (selected && (this.model.events.fetched != null)) {
      this.renderChart();
    }
    return this;
  };
  Subaccount.prototype.renderStatements = function() {
    var statementList;
    statementList = new App.view.StatementList({
      collection: this.model.statements,
      visible: 2
    });
    return this.$('.left').append(statementList.render().el);
  };
  Subaccount.prototype.renderChart = function() {
    var balanceChart;
    if (this.model.events.length !== 0) {
      if (this.model.get('selected') === true) {
        balanceChart = new App.view.BalanceChart({
          model: this.model,
          el: this.$('#balance-chart')
        });
        return $(this.el).append(balanceChart.render().el);
      }
    }
  };
  return Subaccount;
})();