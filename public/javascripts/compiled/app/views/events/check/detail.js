var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.CheckDetail = (function() {
  function CheckDetail() {
    this.showCheckCommentView = __bind(this.showCheckCommentView, this);;
    this.toggleCheckCommentView = __bind(this.toggleCheckCommentView, this);;
    this.renderFeedback = __bind(this.renderFeedback, this);;
    this.render = __bind(this.render, this);;    CheckDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(CheckDetail, Backbone.View);
  CheckDetail.prototype.initialize = function() {
    return this.model.bind('change:merchant', this.render);
  };
  CheckDetail.prototype.events = {
    "click .report-problems": 'toggleCheckCommentView'
  };
  CheckDetail.prototype.render = function() {
    $(this.el).html(App.templates['events/check/detail'](this.model.toDetailJSON()));
    this.$('.available-service li a').button();
    this.$('.check-image ul a').colorbox();
    return this;
  };
  CheckDetail.prototype.renderFeedback = function() {
    return this.options.parent.renderLocationFeedbackView('merchant');
  };
  CheckDetail.prototype.toggleCheckCommentView = function() {
    if ((this.checkCommentView != null) && this.checkCommentView.isActive()) {
      return this.checkCommentView.hide();
    } else {
      return this.showCheckCommentView();
    }
  };
  CheckDetail.prototype.showCheckCommentView = function() {
    if (this.checkCommentView != null) {
      return this.checkCommentView.show();
    } else {
      this.checkCommentView = new App.view.Comment({
        model: this.model,
        commentField: 'check_image_comment',
        title: 'Problems with the check image?',
        buttonText: 'Report problem'
      });
      this.checkCommentView.bind('show', this.options.parent.resize);
      this.checkCommentView.bind('hide', this.options.parent.resize);
      this.$('.check-image').append(this.checkCommentView.render().el);
      return this.checkCommentView.trigger('show');
    }
  };
  return CheckDetail;
})();
App.view.EventDetailFactory.check = App.view.CheckDetail;