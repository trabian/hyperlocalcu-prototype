var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=2", "member-timeline/views/offer_view"], function(jqueryUI, sidebarTemplate, OfferView) {
  var MerchantView;
  MerchantView = function() {
    var _a;
    _a = this;
    this.render = function(){ return MerchantView.prototype.render.apply(_a, arguments); };
    this.close = function(){ return MerchantView.prototype.close.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantView, Backbone.View);
  MerchantView.prototype.events = {
    "click .close": "close"
  };
  MerchantView.prototype.template = Handlebars.compile(sidebarTemplate);
  MerchantView.prototype.initialize = function() {
    return _.extend(this, Backbone.Events);
  };
  MerchantView.prototype.close = function() {
    return this.model.set({
      'selected': false
    });
  };
  MerchantView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.renderMerchantForm();
    this.$('.close').button({
      icons: {
        primary: 'ui-icon-close'
      }
    });
    this.trigger('show');
    return $(this.el).show();
  };
  MerchantView.prototype.hide = function() {
    this.trigger('hide');
    return $(this.el).empty().hide();
  };
  MerchantView.prototype.renderMerchantForm = function() {
    var _a, form, merchant;
    merchant = this.model.get('merchant');
    if (typeof (_a = (typeof merchant === "undefined" || merchant === null) ? undefined : merchant.offers) !== "undefined" && _a !== null) {
      form = this.make('form');
      $(this.el).append(form);
      return (this.offerView = new OfferView({
        model: merchant.offers[0],
        el: form
      }));
    }
  };
  return MerchantView;
});