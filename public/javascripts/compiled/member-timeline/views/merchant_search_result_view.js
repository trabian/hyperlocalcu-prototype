var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=3'], function(handlebars, template) {
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
    alert("(This will soon create a merchant and associate it with this item.  For now, we'll change the name in the transaction list)");
    return this.model.save({
      'name': this.options.result.titleNoFormatting
    });
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