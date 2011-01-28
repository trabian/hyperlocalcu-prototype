var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/merchants/search_with_options.handlebars?v=2'], function(template_with_options) {
  var MerchantSearchView;
  return MerchantSearchView = (function() {
    function MerchantSearchView() {
      MerchantSearchView.__super__.constructor.apply(this, arguments);
    }
    __extends(MerchantSearchView, Backbone.View);
    MerchantSearchView.prototype.id = 'merchant-search';
    MerchantSearchView.prototype.templateWithOptions = Handlebars.compile(template_with_options);
    MerchantSearchView.prototype.initialize = function(options) {
      this.defaultSearch = "" + (this.model.get('name')) + " in " + (this.model.member.cityState());
      return alert(this.defaultSearch);
    };
    MerchantSearchView.prototype.render = function() {
      $(this.el).html(this.templateWithOptions());
      return this;
    };
    return MerchantSearchView;
  })();
});