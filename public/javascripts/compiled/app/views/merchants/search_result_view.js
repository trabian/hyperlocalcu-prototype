var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/merchants/search_result.handlebars?v=1', 'app/models/merchant_list', 'vendor/handlebars'], function(template, MerchantList) {
  var MerchantSearchResultView;
  return MerchantSearchResultView = (function() {
    function MerchantSearchResultView() {
      this.render = __bind(this.render, this);;
      this.select = __bind(this.select, this);;      MerchantSearchResultView.__super__.constructor.apply(this, arguments);
    }
    __extends(MerchantSearchResultView, Backbone.View);
    MerchantSearchResultView.prototype.tagName = 'li';
    MerchantSearchResultView.prototype.className = 'result';
    MerchantSearchResultView.prototype.events = {
      'click': 'select'
    };
    MerchantSearchResultView.prototype.template = Handlebars.compile(template);
    MerchantSearchResultView.prototype.select = function() {
      var params, result;
      result = this.options.result;
      params = {
        name: result.titleNoFormatting,
        street1: result.streetAddress,
        city: result.city,
        region: result.region,
        address_summary: result.addressLines.join("<br />")
      };
      try {
        params.full_result = JSON.stringify(result);
      } catch (error) {

      }
      this.model.addMerchant(params);
      return false;
    };
    MerchantSearchResultView.prototype.render = function() {
      var context, result;
      result = this.options.result;
      context = {
        title: result.titleNoFormatting,
        address: result.addressLines.join('<br />')
      };
      $(this.el).html(this.template(context));
      return this;
    };
    return MerchantSearchResultView;
  })();
});