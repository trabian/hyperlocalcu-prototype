var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'lib/views/rating_view', 'text!views/member-timeline/item.handlebars?v=10'], function(handlebars, RatingView, template) {
  var ItemView;
  ItemView = function() {
    var _a;
    _a = this;
    this.changeSelection = function(){ return ItemView.prototype.changeSelection.apply(_a, arguments); };
    this.onChange = function(){ return ItemView.prototype.onChange.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(ItemView, Backbone.View);
  ItemView.prototype.events = {
    click: "toggleSelectOne"
  };
  ItemView.prototype.tagName = 'tr';
  ItemView.prototype.template = Handlebars.compile(template);
  ItemView.prototype.initialize = function() {
    this.model.bind('change', this.onChange);
    this.collection = this.options.collection;
    return this.render();
  };
  ItemView.prototype.render = function() {
    var ratingView;
    $(this.el).html(this.template(this.model.toViewJSON()));
    ratingView = new RatingView({
      model: this.model
    });
    this.$('td.name').prepend(ratingView.render().el);
    if (this.model.get('amount') > 0) {
      $(this.el).addClass('reward');
    }
    return this;
  };
  ItemView.prototype.onChange = function() {
    var onlySelectedChanged;
    onlySelectedChanged = _.keys(this.model.changedAttributes()).join('') === 'selected';
    return onlySelectedChanged ? this.changeSelection() : this.render();
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