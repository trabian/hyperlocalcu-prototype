var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MerchantSearchResult = (function() {
  function MerchantSearchResult() {
    this.render = __bind(this.render, this);;
    this.select = __bind(this.select, this);;    MerchantSearchResult.__super__.constructor.apply(this, arguments);
  }
  __extends(MerchantSearchResult, Backbone.View);
  MerchantSearchResult.prototype.tagName = 'li';
  MerchantSearchResult.prototype.className = 'result';
  MerchantSearchResult.prototype.events = {
    'click': 'select'
  };
  MerchantSearchResult.prototype.template = Handlebars.compile(template);
  MerchantSearchResult.prototype.select = function() {
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
  MerchantSearchResult.prototype.render = function() {
    var context, result;
    result = this.options.result;
    context = {
      title: result.titleNoFormatting,
      address: result.addressLines.join('<br />')
    };
    $(this.el).html(this.template(context));
    return this;
  };
  return MerchantSearchResult;
})();