var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/members/row.handlebars?v=3', 'vendor/handlebars'], function(template) {
  var EventView;
  EventView = function() {
    var _a;
    _a = this;
    this.changeSelection = function(){ return EventView.prototype.changeSelection.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(EventView, Backbone.View);
  EventView.prototype.events = {
    click: "toggleSelectOne"
  };
  EventView.prototype.tagName = 'tr';
  EventView.prototype.template = Handlebars.compile(template);
  EventView.prototype.initialize = function() {
    this.model.bind('change:selected', this.changeSelection);
    this.collection = this.options.collection;
    return this.render();
  };
  EventView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toViewJSON()));
    if (this.model.get('amount') > 0) {
      $(this.el).addClass('deposit');
    }
    return this;
  };
  EventView.prototype.changeSelection = function() {
    return $(this.el).toggleClass('selected', this.model.get('selected'));
  };
  EventView.prototype.toggleSelectOne = function() {
    var _a;
    return (typeof (_a = this.collection) !== "undefined" && _a !== null) ? this.collection.toggleOrSelectOne(this.model) : this.model.toggleSelected();
  };
  return EventView;
});