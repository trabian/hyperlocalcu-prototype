var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'text!views/member-timeline/item.handlebars?v=3'], function(handlebars, template) {
  var ItemView;
  ItemView = function() {
    var _a;
    _a = this;
    this.changeSelection = function(){ return ItemView.prototype.changeSelection.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(ItemView, Backbone.View);
  ItemView.prototype.events = {
    click: "toggleSelectOne"
  };
  ItemView.prototype.tagName = 'tr';
  ItemView.prototype.template = Handlebars.compile(template);
  ItemView.prototype.initialize = function() {
    this.model.bind('change:selected', this.changeSelection);
    this.collection = this.options.collection;
    this.id = ("item-" + (this.model.id));
    return this.render();
  };
  ItemView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toViewJSON()));
    if (this.model.get('amount') > 0) {
      $(this.el).addClass('reward');
    }
    return this;
  };
  ItemView.prototype.changeSelection = function() {
    return $(this.el).toggleClass('selected', this.model.get('selected'));
  };
  ItemView.prototype.toggleSelectOne = function() {
    var _a;
    return (typeof (_a = this.collection) !== "undefined" && _a !== null) ? this.collection.toggleOrSelectOne(this.model) : this.model.toggleSelected();
  };
  return ItemView;
});