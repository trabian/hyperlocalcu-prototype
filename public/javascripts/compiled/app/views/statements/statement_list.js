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
  StatementList.prototype.initialize = function(options) {
    this.template = App.templates['statements/statement_list'];
    return this.statementTemplate = App.templates['statements/statement'];
  };
  StatementList.prototype.render = function() {
    var statementList, visibleStatements;
    if (!this.collection.isEmpty()) {
      $(this.el).html(this.template());
      statementList = this.$('.statements');
      visibleStatements = this.collection.toArray().slice(0, this.options.visible);
      _.each(visibleStatements, __bind(function(statement, index) {
        return $(statementList).append(this.statementTemplate(statement.toViewJSON()));
      }, this));
      if (this.collection.length > this.options.visible) {
        $(statementList).append(this.make('li', {}, "<a href='#' class='older'>Older &#9662;</a>"));
      }
    }
    return this;
  };
  return StatementList;
})();