var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.StatementList = (function() {
  function StatementList() {
    this.render = __bind(this.render, this);;    StatementList.__super__.constructor.apply(this, arguments);
  }
  __extends(StatementList, Backbone.View);
  StatementList.prototype.initialize = function(options) {};
  StatementList.prototype.render = function() {
    var statementList;
    statementList = this.make('ul', {
      className: 'statements'
    });
    this.collection.each(__bind(function(statement) {
      return $(statementList).append(this.make('li', {
        className: 'statement'
      }, 'Testing'));
    }, this));
    $(this.el).html(statementList);
    return this;
  };
  return StatementList;
})();