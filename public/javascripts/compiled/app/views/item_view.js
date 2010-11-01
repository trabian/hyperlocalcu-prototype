(function() {
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
      return Backbone.View.apply(this, arguments);
    };
    __extends(ItemView, Backbone.View);
    ItemView.prototype.events = {
      click: "select"
    };
    ItemView.prototype.tagName = 'tr';
    ItemView.prototype.template = Handlebars.compile(template);
    ItemView.prototype.initialize = function() {
      _.bindAll(this, 'render');
      return this.model.bind('change', this.render);
    };
    ItemView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toViewJSON()));
      this.addRowClass();
      return this;
    };
    ItemView.prototype.addRowClass = function() {
      if (this.model.get('selected')) {
        $(this.el).addClass('selected');
      } else {
        $(this.el).removeClass('selected');
      }
      return this.model.get('amount') > 0 ? $(this.el).addClass('reward') : null;
    };
    ItemView.prototype.select = function() {
      return this.model.toggleSelect();
    };
    return ItemView;
  });
}).call(this);
