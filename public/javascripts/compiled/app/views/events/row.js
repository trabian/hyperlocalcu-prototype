var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __slice = Array.prototype.slice;
App.view.EventRow = (function() {
  function EventRow() {
    this.onChange = __bind(this.onChange, this);;
    this.changeSelection = __bind(this.changeSelection, this);;    EventRow.__super__.constructor.apply(this, arguments);
  }
  __extends(EventRow, Backbone.View);
  EventRow.prototype.events = {
    click: "selectOne"
  };
  EventRow.prototype.tagName = 'tr';
  EventRow.prototype.className = 'withdrawal';
  EventRow.prototype.initialize = function() {
    this.template = App.templates['events/row'];
    this.model.bind('change:selected', this.changeSelection);
    this.model.bind('change', this.onChange);
    return this.render();
  };
  EventRow.prototype.render = function() {
    $(this.el).html(this.template(this.model.toViewJSON()));
    return this;
  };
  EventRow.prototype.changeSelection = function() {
    return $(this.el).toggleClass('selected', this.model.get('selected'));
  };
  EventRow.prototype.onChange = function() {
    var attributesToIgnore, changedKeys;
    attributesToIgnore = ['selected'];
    changedKeys = _.keys(this.model.changedAttributes());
    if (_.isEmpty(_.without.apply(_, [changedKeys].concat(__slice.call(attributesToIgnore))))) {
      return;
    }
    return this.render();
  };
  EventRow.prototype.selectOne = function() {
    if (this.collection != null) {
      return this.collection.selectOne(this.model);
    } else {
      return this.model.toggleSelected();
    }
  };
  return EventRow;
})();