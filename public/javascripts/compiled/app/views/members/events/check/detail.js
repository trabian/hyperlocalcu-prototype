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
    this.addMerchantSearchView = __bind(this.addMerchantSearchView, this);;
    this.showCheckCommentView = __bind(this.showCheckCommentView, this);;
    this.renderDetail = __bind(this.renderDetail, this);;
    this.toggleCheckCommentView = __bind(this.toggleCheckCommentView, this);;    CheckDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(CheckDetail, App.view.EventDetail);
  CheckDetail.prototype.initialize = function() {
    mpq.push(["track", "View billpay offer"]);
    this.model.bind('change:merchant', this.render);
    return CheckDetail.__super__.initialize.call(this);
  };
  CheckDetail.prototype.eventTypeOptions = {
    events: {
      "click .report-problems": 'toggleCheckCommentView'
    },
    templatePath: 'members/events/check/detail'
  };
  CheckDetail.prototype.toggleCheckCommentView = function() {
    if ((this.checkCommentView != null) && this.checkCommentView.isActive()) {
      this.checkCommentView.hide();
    } else {
      this.showCheckCommentView();
    }
    return false;
  };
  CheckDetail.prototype.renderDetail = function() {
    this.$('.available-service li a').button();
    this.$('.check-image a').colorbox();
    if (this.model.get('merchant') == null) {
      return this.addMerchantSearchView();
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
      this.checkCommentView.bind('show', this.resize);
      this.checkCommentView.bind('hide', this.resize);
      this.$('.check-image').append(this.checkCommentView.render().el);
      return this.checkCommentView.trigger('show');
    }
  };
  CheckDetail.prototype.addMerchantSearchView = function() {
    this.merchantSearchView = new App.view.MerchantSearch({
      model: this.model,
      searchPrompt: "Search for merchant information:"
    });
    return this.$('#event-detail').prepend(this.merchantSearchView.render().el);
  };
  return CheckDetail;
})();