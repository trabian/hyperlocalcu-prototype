var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __slice = Array.prototype.slice;
define(["text!views/timeline/events/detail.handlebars?v=8", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "app/views/common/feedback/rating_view", "vendor/handlebars"], function(template, SocialView, FeedbackView, RatingView) {
  var EventDetailView;
  return EventDetailView = (function() {
    function EventDetailView() {
      this.addFeedbackView = __bind(this.addFeedbackView, this);;
      this.addMerchantFeedbackView = __bind(this.addMerchantFeedbackView, this);;
      this.render = __bind(this.render, this);;
      this.close = __bind(this.close, this);;      EventDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(EventDetailView, Backbone.View);
    EventDetailView.prototype.events = {
      "click .close": "close"
    };
    EventDetailView.prototype.template = Handlebars.compile(template);
    EventDetailView.prototype.initialize = function() {
      if ((this.eventTypeOptions != null) && (this.eventTypeOptions.events != null)) {
        return this.delegateEvents(this.eventTypeOptions.events);
      }
    };
    EventDetailView.prototype.close = function() {
      return this.model.set({
        'selected': false
      });
    };
    EventDetailView.prototype.render = function() {
      var detailJSON;
      mpq.push([
        "track", "View event detail", {
          event_type: this.model.get('event_type'),
          id: this.model.id
        }
      ]);
      this.model.initializeDetails();
      detailJSON = this.model.toDetailJSON();
      $(this.el).html(this.template(detailJSON));
      this.detail = this.$('#event-detail');
      if (this.model.isSocial()) {
        this.socialView = new SocialView({
          model: this.model
        });
        this.detail.append(this.socialView.render().el);
      }
      if ((this.eventTypeOptions != null) && (this.eventTypeOptions.template != null)) {
        this.detail.append(this.eventTypeOptions.template(detailJSON));
      }
      if (this.renderDetail != null) {
        this.renderDetail();
      }
      if (this.model.isDeposit()) {
        this.detail.addClass('deposit');
      }
      if (this.model.get('merchant') != null) {
        this.addMerchantFeedbackView();
      }
      return this.show();
    };
    EventDetailView.prototype.show = function() {
      this.trigger('show');
      return $(this.el).show();
    };
    EventDetailView.prototype.hide = function() {
      this.trigger('hide');
      return $(this.el).empty().hide();
    };
    EventDetailView.prototype.addMerchantFeedbackView = function() {
      var feedback;
      feedback = this.model.feedbacks.for_subject('merchant');
      if (feedback != null) {
        this.merchantDetails = this.detail.find('.address');
        this.merchantRatingView = new RatingView({
          model: feedback,
          commentParent: this.merchantDetails,
          commentFormTitle: "Care to elaborate?"
        });
        return this.merchantDetails.append(this.merchantRatingView.render().el);
      }
    };
    EventDetailView.prototype.addFeedbackView = function() {
      var subject_types;
      subject_types = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _.each(subject_types, __bind(function(subject_type) {
        var feedback;
        feedback = this.model.feedbacks.for_subject(subject_type);
        if (feedback != null) {
          this.feedbackView = new FeedbackView({
            model: feedback,
            question: this.model.feedbackQuestion
          });
          return this.detail.append(this.feedbackView.render().el);
        }
      }, this));
    };
    return EventDetailView;
  })();
});