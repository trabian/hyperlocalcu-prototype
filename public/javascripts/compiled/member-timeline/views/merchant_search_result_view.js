var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=4'], function(handlebars, template) {
  var MerchantSearchResultView;
  MerchantSearchResultView = function() {
    var _a;
    _a = this;
    this.render = function(){ return MerchantSearchResultView.prototype.render.apply(_a, arguments); };
    this.select = function(){ return MerchantSearchResultView.prototype.select.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantSearchResultView, Backbone.View);
  MerchantSearchResultView.prototype.tagName = 'li';
  MerchantSearchResultView.prototype.className = 'result';
  MerchantSearchResultView.prototype.events = {
    'click button': 'select'
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
    return this.model.addMerchant(params);
  };
  MerchantSearchResultView.prototype.render = function() {
    var context, result;
    result = this.options.result;
    context = {
      title: result.titleNoFormatting,
      address: result.addressLines.join('<br />')
    };
    $(this.el).html(this.template(context));
    this.$('button').button({
      icons: {
        primary: 'ui-icon-check'
      }
    });
    return this;
  };
  return MerchantSearchResultView;
});