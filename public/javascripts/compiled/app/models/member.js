var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Member = (function() {
  function Member() {
    this.name = __bind(this.name, this);;
    this.cityState = __bind(this.cityState, this);;    Member.__super__.constructor.apply(this, arguments);
  }
  __extends(Member, Backbone.Model);
  Member.prototype.initialize = function() {
    return this.accounts = new App.model.AccountList(this.get('accounts'));
  };
  Member.prototype.cityState = function() {
    return [this.get('city'), this.get('region')].join(', ');
  };
  Member.prototype.name = function() {
    return "" + (this.get('first_name')) + " " + (this.get('last_name'));
  };
  Member.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      name: this.name(),
      last_login: "2/28/2011"
    });
  };
  return Member;
})();