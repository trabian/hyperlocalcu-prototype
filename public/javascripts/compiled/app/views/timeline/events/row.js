var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/events/row.handlebars?v=3', 'vendor/handlebars'], function(template) {
  var EventRowView;
  EventRowView = function() {
    var _a;
    _a = this;
    this.changeSelection = function(){ return EventRowView.prototype.changeSelection.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(EventRowView, Backbone.View);
  EventRowView.prototype.events = {
    click: "toggleSelectOne"
  };
  EventRowView.prototype.tagName = 'tr';
  EventRowView.prototype.className = 'withdrawal';
  EventRowView.prototype.template = Handlebars.compile(template);
  EventRowView.prototype.initialize = function() {
    this.model.bind('change:selected', this.changeSelection);
    return this.render();
  };
  EventRowView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toViewJSON()));
    return this;
  };
  EventRowView.prototype.changeSelection = function() {
    return $(this.el).toggleClass('selected', this.model.get('selected'));
  };
  EventRowView.prototype.toggleSelectOne = function() {
    var _a;
    return (typeof (_a = this.collection) !== "undefined" && _a !== null) ? this.collection.toggleOrSelectOne(this.model) : this.model.toggleSelected();
  };
  return EventRowView;
});