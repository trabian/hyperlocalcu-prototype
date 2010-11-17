var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=2"], function(jqueryUI, sidebarTemplate) {
  var MerchantView;
  MerchantView = function() {
    var _a;
    _a = this;
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
  return MerchantView;
});