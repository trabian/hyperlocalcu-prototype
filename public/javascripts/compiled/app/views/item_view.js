var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['lib/handlebars', 'text!/templates/item.handlebars?v=2'], function(handlebars, template) {
  var ItemView;
  ItemView = function() {
    var _this;
    _this = this;
    this.changeSelection = function(){ return ItemView.prototype.changeSelection.apply(_this, arguments); };
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
    var _ref;
    return (typeof (_ref = this.collection) !== "undefined" && _ref !== null) ? this.collection.toggleOrSelectOne(this.model) : this.model.toggleSelected();
  };
  return ItemView;
});