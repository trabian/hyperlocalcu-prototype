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
    this.renderSocialView = __bind(this.renderSocialView, this);;
    this.decorate = __bind(this.decorate, this);;
    this.render = __bind(this.render, this);;    EventDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(EventDetail, Backbone.View);
  EventDetail.prototype.templatePath = 'events/detail';
  EventDetail.prototype.initialize = function() {};
  EventDetail.prototype.setModel = function(model) {
    this.model = model;
    return this.eventTypeView = App.view.EventDetailFactory.getEventDetailView(this.model, this);
  };
  EventDetail.prototype.render = function() {
    var _ref;
    $(this.el).html(App.templates[this.templatePath](this.model.toDetailJSON()));
    if (((_ref = this.eventTypeView) != null ? _ref.render : void 0) != null) {
      this.$('#event-detail').append(this.eventTypeView.render().el);
    }
    this.decorate();
    if (this.model.isSocial()) {
      this.renderSocialView();
    }
    this.model.feedbacks.fetchIfNeeded({
      success: __bind(function(collection, response) {
        var _ref;
        if ((_ref = this.eventTypeView) != null) {
          if (typeof _ref.renderFeedback == "function") {
            _ref.renderFeedback();
          }
        }
        return this.resize();
      }, this)
    });
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