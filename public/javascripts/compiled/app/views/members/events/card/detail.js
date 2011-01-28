var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/timeline/events/card/detail.handlebars?v=4', 'app/views/members/events/detail', 'app/views/merchants/search_view', 'vendor/handlebars', 'vendor/jquery-colorbox'], function(template, EventDetailView, MerchantSearchView) {
  var CardDetailView;
  return CardDetailView = (function() {
    function CardDetailView() {
      this.addMerchantSearchView = __bind(this.addMerchantSearchView, this);;
      this.renderDetail = __bind(this.renderDetail, this);;      CardDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(CardDetailView, EventDetailView);
    CardDetailView.prototype.eventTypeOptions = {
      template: Handlebars.compile(template)
    };
    CardDetailView.prototype.renderDetail = function() {
      this.$('.receipt-image a').colorbox();
      this.$('.receipt-upload a.upload').button();
      if (this.model.get('merchant') == null) {
        return this.addMerchantSearchView();
      }
    };
    CardDetailView.prototype.addMerchantSearchView = function() {
      this.merchantSearchView = new MerchantSearchView({
        model: this.model
      });
      return this.$('#event-detail').prepend(this.merchantSearchView.render().el);
    };
    return CardDetailView;
  })();
});