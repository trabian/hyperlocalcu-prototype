var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
App.view.FeedbackRow = (function() {
  function FeedbackRow() {
    FeedbackRow.__super__.constructor.apply(this, arguments);
  }
  __extends(FeedbackRow, Backbone.View);
  FeedbackRow.prototype.tagName = 'tr';
  FeedbackRow.prototype.className = 'feedback';
  FeedbackRow.prototype.initialize = function() {
    this.template = App.templates['common/feedback/timeline/row'];
    this.model.bind('change', __bind(function() {
      return this.render();
    }, this));
    return this.render();
  };
  FeedbackRow.prototype.render = function() {
    var ratingView;
    $(this.el).html(this.template(this.model.toViewJSON()));
    ratingView = new App.view.Rating({
      model: this.model,
      rating: this.model.get('rating'),
      readOnly: true
    });
    this.$('.rating').append(ratingView.render().el);
    return this;
  };
  return FeedbackRow;
})();