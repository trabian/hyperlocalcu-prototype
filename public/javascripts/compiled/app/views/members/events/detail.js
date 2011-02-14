var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __slice = Array.prototype.slice;
define(["text!views/timeline/events/detail.handlebars?v=9", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-mousewheel", "vendor/jquery-jscrollpane"], function(template, SocialView, FeedbackView, RatingView) {
  var EventDetailView;
  return EventDetailView = (function() {
    function EventDetailView() {
      this.addFeedbackView = __bind(this.addFeedbackView, this);;
      this.addLocationFeedbackView = __bind(this.addLocationFeedbackView, this);;
      this.resize = __bind(this.resize, this);;
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
      var detailJSON, shim;
      mpq.push([
        "track", "View event detail", {
          event_type: this.model.get('event_type'),
          id: this.model.id
        }
      ]);
      this.model.initializeDetails();
      detailJSON = this.model.toDetailJSON();
      $(this.el).html(this.template(detailJSON));
      this.header = this.$('#event-header');
      this.detail = this.$('#event-detail');
      this.wrapper = this.$('#event-detail-wrapper');
      this.footer = this.$('#event-footer');
      if (this.model.isSocial()) {
        this.footer.show();
        this.socialView = new SocialView({
          model: this.model
        });
        this.footer.append(this.socialView.render().el);
      }
      if ((this.eventTypeOptions != null) && (this.eventTypeOptions.template != null)) {
        this.detail.append(this.eventTypeOptions.template(detailJSON));
      }
      if (this.renderDetail != null) {
        this.renderDetail();
      }
      if (this.model.isDeposit()) {
        this.header.addClass('deposit');
      }
      if (this.model.get('merchant') != null) {
        this.addLocationFeedbackView('merchant');
      }
      this.show();
      this.wrapper.jScrollPane();
      this.scroll = this.wrapper.data('jsp');
      shim = 45;
      if (this.footer.is(':visible')) {
        shim = shim + this.footer.innerHeight();
      }
      this.heightOffset = parseInt($(this.el).css('top')) + this.header.height() + shim;
      $(window).bind('resize', this.resize);
      return $(window).trigger('resize');
    };
    EventDetailView.prototype.resize = function() {
      var height;
      height = $(window).height();
      this.wrapper.height(height - this.heightOffset);
      if ($.browser.ie) {
        if (!throttleTimeout) {
          return setTimeout(__bind(function() {
            var throttleTimeout;
            this.scroll.reinitialise();
            return throttleTimeout = null;
          }, this), 50);
        }
      } else {
        return this.scroll.reinitialise();
      }
    };
    EventDetailView.prototype.show = function() {
      this.trigger('show');
      return $(this.el).show();
    };
    EventDetailView.prototype.hide = function() {
      this.trigger('hide');
      return $(this.el).empty().hide();
    };
    EventDetailView.prototype.addLocationFeedbackView = function(field, options) {
      var feedback, ratingViewOptions;
      feedback = this.model.feedbacks.for_subject(field);
      if (feedback != null) {
        this.addressEl = this.detail.find('.address');
        ratingViewOptions = _.extend({
          model: feedback,
          commentParent: this.addressEl,
          commentFormTitle: "Care to elaborate?"
        }, options);
        this.locationRatingView = new RatingView(ratingViewOptions);
        this.locationRatingView.bind('expand', this.resize);
        this.locationRatingView.bind('collapse', this.resize);
        return this.addressEl.append(this.locationRatingView.render().el);
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
          this.feedbackView.bind('expand', this.resize);
          this.feedbackView.bind('collapse', this.resize);
          return this.detail.append(this.feedbackView.render().el);
        }
      }, this));
    };
    return EventDetailView;
  })();
});