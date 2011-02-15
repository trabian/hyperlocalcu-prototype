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
    this.renderDetail = __bind(this.renderDetail, this);;    CardDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(CardDetail, App.view.EventDetail);
  CardDetail.prototype.initialize = function() {
    return this.model.bind('change:merchant', this.render);
  };
  CardDetail.prototype.eventTypeOptions = {
    templatePath: 'members/events/card/detail'
  };
  CardDetail.prototype.renderDetail = function() {
    this.$('.receipt-image a').colorbox();
    this.$('.receipt-upload a.upload').button();
    if (this.model.get('merchant') == null) {
      return this.addMerchantSearchView();
    }
  };
  CardDetail.prototype.addMerchantSearchView = function() {
    this.merchantSearchView = new App.view.MerchantSearch({
      model: this.model
    });
    return this.$('#event-detail').prepend(this.merchantSearchView.render().el);
  };
  return CardDetail;
})();