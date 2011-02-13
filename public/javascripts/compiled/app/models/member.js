var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(function() {
  var Member;
  return Member = (function() {
    function Member() {
      this.cityState = __bind(this.cityState, this);;      Member.__super__.constructor.apply(this, arguments);
    }
    __extends(Member, Backbone.Model);
    Member.prototype.cityState = function() {
      return [this.get('city'), this.get('region')].join(', ');
    };
    return Member;
  })();
});