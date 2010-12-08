var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var StarView;
  StarView = function() {
    var _a;
    _a = this;
    this.render = function(){ return StarView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(StarView, Backbone.View);
  StarView.prototype.tagName = 'div';
  StarView.prototype.className = 'rating';
  StarView.prototype.events = {
    'hover a.star': 'fillStar'
  };
  StarView.prototype.render = function() {
    return console.log('create star');
  };
  return StarView;
});