var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.CardDetail = (function() {
  function CardDetail() {
    this.addMerchantSearchView = __bind(this.addMerchantSearchView, this);;
    this.renderFeedback = __bind(this.renderFeedback, this);;
    this.render = __bind(this.render, this);;    CardDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(CardDetail, App.view.EventDetail);
  CardDetail.prototype.initialize = function() {
    return this.model.bind('change:merchant', __bind(function() {
      return this.options.parent.options.mainView.renderEventDetail(this.model);
    }, this));
  };
  CardDetail.prototype.render = function() {
    $(this.el).html(App.templates['events/card/detail'](this.model.toDetailJSON()));
    this.$('.receipt-image a').colorbox();
    this.$('.receipt-upload a.upload').button();
    if (this.model.get('merchant') == null) {
      this.addMerchantSearchView();
    }
    return this;
  };
  CardDetail.prototype.renderFeedback = function() {
    if (this.model.get('merchant') != null) {
      return this.options.parent.renderLocationFeedbackView('merchant');
    }
  };
  CardDetail.prototype.addMerchantSearchView = function() {
    this.merchantSearchView = new App.view.MerchantSearch({
      model: this.model
    });
    return $(this.el).prepend(this.merchantSearchView.render().el);
  };
  return CardDetail;
})();
App.view.EventDetailFactory.card = App.view.CardDetail;