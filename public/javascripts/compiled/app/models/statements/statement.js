var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Statement = (function() {
  function Statement() {
    this.formattedStatementDate = __bind(this.formattedStatementDate, this);;    Statement.__super__.constructor.apply(this, arguments);
  }
  __extends(Statement, Backbone.Model);
  Statement.prototype.formattedStatementDate = function() {
    return this.formatDate(this.get('statement_date'), 'M. yy');
  };
  Statement.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      formattedStatementDate: this.formattedStatementDate
    });
  };
  return Statement;
})();
_.extend(App.model.Statement.prototype, App.model.extension.Dates);