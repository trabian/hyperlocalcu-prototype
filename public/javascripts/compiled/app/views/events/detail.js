var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __slice = Array.prototype.slice;
App.view.EventDetail = (function() {
  function EventDetail() {
    this.addSubjectFeedbackView = __bind(this.addSubjectFeedbackView, this);;
    this.resize = __bind(this.resize, this);;
    this.renderLocationFeedbackView = __bind(this.renderLocationFeedbackView, this);;
    this.renderFeedback = __bind(this.renderFeedback, this);;
    this.renderSocialView = __bind(this.renderSocialView, this);;
    this.decorate = __bind(this.decorate, this);;
    this.render = __bind(this.render, this);;    EventDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(EventDetail, Backbone.View);
  EventDetail.prototype.templatePath = 'events/detail';
  EventDetail.prototype.initialize = function() {};
  EventDetail.prototype.setModel = function(model) {
    this.model = model;
    this.model.feedbacks.unbind('refresh');
    this.model.feedbacks.bind('refresh', this.renderFeedback);
    return this.eventTypeView = App.view.EventDetailFactory.getEventDetailView(this.model, this);
  };
  EventDetail.prototype.render = function() {
    $(this.el).html(App.templates[this.templatePath](this.model.toDetailJSON()));
    this.decorate();
    if (this.model.isSocial()) {
      this.renderSocialView();
    }
    this.model.feedbacks.fetch();
    return this;
  };
  EventDetail.prototype.decorate = function() {
    return $(this.el).toggleClass('deposit', this.model.isDeposit());
  };
  EventDetail.prototype.renderSocialView = function() {
    this.socialView = new App.view.Social({
      model: this.model
    });
    return this.$('.footer').append(this.socialView.render().el).show();
  };
  EventDetail.prototype.renderFeedback = function() {
    var _ref;
    return (_ref = this.eventTypeView) != null ? typeof _ref.renderFeedback == "function" ? _ref.renderFeedback() : void 0 : void 0;
  };
  EventDetail.prototype.renderLocationFeedbackView = function(field, options) {
    var addressEl, feedback, locationRatingView, ratingViewOptions;
    feedback = this.model.feedbacks.for_subject(field);
    if (feedback != null) {
      addressEl = this.$('.location .address');
      ratingViewOptions = _.extend({
        model: feedback,
        commentParent: addressEl,
        commentFormTitle: "Care to elaborate?"
      }, options);
      locationRatingView = new App.view.Rating(ratingViewOptions);
      locationRatingView.bind('expand', this.resize);
      locationRatingView.bind('collapse', this.resize);
      return addressEl.append(locationRatingView.render().el);
    }
  };
  EventDetail.prototype.resize = function() {
    return this.trigger('resize');
  };
  EventDetail.prototype.addSubjectFeedbackView = function() {
    var subject_types;
    subject_types = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return _.each(subject_types, __bind(function(subject_type) {
      var feedback, feedbackView;
      feedback = this.model.feedbacks.for_subject(subject_type);
      if (feedback != null) {
        feedbackView = new App.view.Feedback({
          model: feedback,
          question: this.model.feedbackQuestion
        });
        feedbackView.bind('expand', this.resize);
        feedbackView.bind('collapse', this.resize);
        return this.$('#event-detail').append(feedbackView.render().el);
      }
    }, this));
  };
  return EventDetail;
})();