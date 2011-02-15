var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.AtmRow = (function() {
  function AtmRow() {
    AtmRow.__super__.constructor.apply(this, arguments);
  }
  __extends(AtmRow, App.view.EventRow);
  return AtmRow;
})();