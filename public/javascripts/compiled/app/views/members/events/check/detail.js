var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/timeline/events/check/detail.handlebars?v=7', 'app/views/members/events/detail', 'app/views/common/feedback/comment_view', 'app/views/merchants/search_view', 'vendor/handlebars', 'vendor/jquery-colorbox'], function(template, EventDetailView, CommentView, MerchantSearchView) {
  var CheckDetailView;
  return CheckDetailView = (function() {
    function CheckDetailView() {
      this.addMerchantSearchView = __bind(this.addMerchantSearchView, this);;
      this.showCheckCommentView = __bind(this.showCheckCommentView, this);;
      this.renderDetail = __bind(this.renderDetail, this);;
      this.toggleCheckCommentView = __bind(this.toggleCheckCommentView, this);;      CheckDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(CheckDetailView, EventDetailView);
    CheckDetailView.prototype.initialize = function() {
      mpq.push(["track", "View billpay offer"]);
      this.model.bind('change:merchant', this.render);
      return CheckDetailView.__super__.initialize.call(this);
    };
    CheckDetailView.prototype.eventTypeOptions = {
      events: {
        "click .report-problems": 'toggleCheckCommentView'
      },
      template: Handlebars.compile(template)
    };
    CheckDetailView.prototype.toggleCheckCommentView = function() {
      if ((this.checkCommentView != null) && this.checkCommentView.isActive()) {
        this.checkCommentView.hide();
      } else {
        this.showCheckCommentView();
      }
      return false;
    };
    CheckDetailView.prototype.renderDetail = function() {
      this.$('.available-service li a').button();
      this.$('.check-image a').colorbox();
      if (this.model.get('merchant') == null) {
        return this.addMerchantSearchView();
      }
    };
    CheckDetailView.prototype.showCheckCommentView = function() {
      if (this.checkCommentView != null) {
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
    CheckDetailView.prototype.addMerchantSearchView = function() {
      this.merchantSearchView = new MerchantSearchView({
        model: this.model,
        searchPrompt: "Search for merchant information:"
      });
      return this.$('#event-detail').prepend(this.merchantSearchView.render().el);
    };
    return CheckDetailView;
  })();
});