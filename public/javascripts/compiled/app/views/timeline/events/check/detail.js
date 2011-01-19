var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/timeline/events/check/detail.handlebars?v=2', 'app/views/timeline/events/detail', 'app/views/common/feedback/comment_view', 'vendor/handlebars'], function(template, EventDetailView, CommentView) {
  var CheckDetailView;
  CheckDetailView = function() {
    var _a;
    _a = this;
    this.showCheckCommentView = function(){ return CheckDetailView.prototype.showCheckCommentView.apply(_a, arguments); };
    this.toggleCheckCommentView = function(){ return CheckDetailView.prototype.toggleCheckCommentView.apply(_a, arguments); };
    return EventDetailView.apply(this, arguments);
  };
  __extends(CheckDetailView, EventDetailView);
  CheckDetailView.prototype.eventTypeOptions = {
    events: {
      "click .report-problems": 'toggleCheckCommentView'
    },
    template: Handlebars.compile(template)
  };
  CheckDetailView.prototype.toggleCheckCommentView = function() {
    var _a;
    if ((typeof (_a = this.checkCommentView) !== "undefined" && _a !== null) && this.checkCommentView.isActive()) {
      this.checkCommentView.hide();
    } else {
      this.showCheckCommentView();
    }
    return false;
  };
  CheckDetailView.prototype.showCheckCommentView = function() {
    var _a;
    if (typeof (_a = this.checkCommentView) !== "undefined" && _a !== null) {
      return this.checkCommentView.show();
    } else {
      this.checkCommentView = new CommentView({
        model: this.model,
        commentField: 'check_image_comment',
        title: 'Problems with the check image?',
        buttonText: 'Report problem'
      });
      return this.$('.check-image').append(this.checkCommentView.render().el);
    }
  };
  return CheckDetailView;
});