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
    this.addFeedbackView = __bind(this.addFeedbackView, this);;
    this.addLocationFeedbackView = __bind(this.addLocationFeedbackView, this);;
    this.resize = __bind(this.resize, this);;
    this.render = __bind(this.render, this);;
    this.close = __bind(this.close, this);;    EventDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(EventDetail, Backbone.View);
  EventDetail.prototype.events = {
    "click .close": "close"
  };
  EventDetail.prototype.templatePath = 'members/events/detail';
  EventDetail.prototype.initialize = function() {
    if (this.eventTypeOptions != null) {
      if (this.eventTypeOptions.events != null) {
        this.delegateEvents(this.eventTypeOptions.events);
      }
      if (this.eventTypeOptions.templatePath != null) {
        return this.eventTypeOptions.template = App.templates[this.eventTypeOptions.templatePath];
      }
    }
  };
  EventDetail.prototype.close = function() {
    this.model.set({
      'selected': false
    });
    this.hide();
    return false;
  };
  EventDetail.prototype.render = function() {
    var detailJSON;
    mpq.push([
      "track", "View event detail", {
        event_type: this.model.get('event_type'),
        id: this.model.id
      }
    ]);
    this.model.initializeDetails();
    detailJSON = this.model.toDetailJSON();
    $(this.el).html(App.templates[this.templatePath](detailJSON));
    this.header = this.$('#event-header');
    this.detail = this.$('#event-detail');
    this.wrapper = this.$('#event-detail-wrapper');
    this.footer = this.$('#event-footer');
    if (this.model.isSocial() && false) {
      this.footer.show();
      this.socialView = new App.view.Social({
        model: this.model
      });
      this.footer.append(this.socialView.render().el);
    }
    if ((this.eventTypeOptions != null) && (this.eventTypeOptions.template != null)) {
      this.detail.append(this.eventTypeOptions.template(detailJSON));
    }
    this.show();
    this.wrapper.jScrollPane();
    if (this.renderDetail != null) {
      this.renderDetail();
    }
    if (this.model.isDeposit()) {
      this.header.addClass('deposit');
    }
    if (this.model.get('merchant') != null) {
      this.addLocationFeedbackView('merchant', {
        include_summary_view: true
      });
    }
    this.scroll = this.wrapper.data('jsp');
    this.trigger('rendered');
    return this;
  };
  EventDetail.prototype.resize = function(height) {
    var shim, wrapperHeight;
    shim = 17;
    wrapperHeight = height - shim;
    if (this.header.is(':visible')) {
      wrapperHeight -= this.header.outerHeight();
    }
    if (this.footer.is(':visible')) {
      wrapperHeight -= this.footer.outerHeight();
    }
    this.wrapper.css({
      height: Math.max(0, wrapperHeight)
    });
    return this.scroll.reinitialise();
  };
  EventDetail.prototype.show = function() {
    this.trigger('show');
    return $(this.el).show();
  };
  EventDetail.prototype.hide = function() {
    this.trigger('hide');
    return $(this.el).empty().hide();
  };
  EventDetail.prototype.addLocationFeedbackView = function(field, options) {
    var feedback, ratingViewOptions;
    feedback = this.model.feedbacks.for_subject(field);
    if (feedback != null) {
      this.addressEl = this.detail.find('.address');
      ratingViewOptions = _.extend({
        model: feedback,
        commentParent: this.addressEl,
        commentFormTitle: "Care to elaborate?"
      }, options);
      this.locationRatingView = new App.view.Rating(ratingViewOptions);
      this.addressEl.append(this.locationRatingView.render().el);
      this.feedbackSummaryView = new App.view.FeedbackSummary;
      return this.addressEl.append(this.feedbackSummaryView.render().el);
    }
  };
  EventDetail.prototype.addFeedbackView = function() {
    var subject_types;
    subject_types = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return _.each(subject_types, __bind(function(subject_type) {
      var feedback;
      feedback = this.model.feedbacks.for_subject(subject_type);
      if (feedback != null) {
        this.feedbackView = new App.view.Feedback({
          model: feedback,
          question: this.model.feedbackQuestion
        });
        return this.detail.append(this.feedbackView.render().el);
      }
    }, this));
  };
  return EventDetail;
})();