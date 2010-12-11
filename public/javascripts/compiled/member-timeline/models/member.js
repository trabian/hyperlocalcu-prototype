var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var Member;
  Member = function() {
    var _a;
    _a = this;
    this.cityState = function(){ return Member.prototype.cityState.apply(_a, arguments); };
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Member, Backbone.Model);
  Member.prototype.cityState = function() {
    return [this.get('address').city, this.get('address').state].join(', ');
  };
  return Member;
});