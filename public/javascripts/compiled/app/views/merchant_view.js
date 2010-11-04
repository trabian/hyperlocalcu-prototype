var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["lib/jquery-ui"], function() {
  var MerchantView;
  MerchantView = function() {
    var _this;
    _this = this;
    this.loadContent = function(){ return MerchantView.prototype.loadContent.apply(_this, arguments); };
    this.close = function(){ return MerchantView.prototype.close.apply(_this, arguments); };
    this.changeSelected = function(){ return MerchantView.prototype.changeSelected.apply(_this, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantView, Backbone.View);
  MerchantView.prototype.el = $('#merchant-view');
  MerchantView.prototype.events = {
    "click .close": "close"
  };
  MerchantView.prototype.initialize = function(items) {
    items.bind('change:selected', this.changeSelected);
    return this.$('.close').button({
      icons: {
        primary: 'ui-icon-close'
      }
    });
  };
  MerchantView.prototype.changeSelected = function(item) {
    if (item.get('selected')) {
      this.loadContent(item);
      this.currentItem = item;
      return $(this.el).show();
    } else {
      return $(this.el).find('.content').html('').end().hide();
    }
  };
  MerchantView.prototype.close = function() {
    return this.currentItem.set({
      'selected': false
    });
  };
  MerchantView.prototype.loadContent = function(item) {
    return $(this.el).find('.content').html('<h3>' + item.get('name') + '<h3>');
  };
  return MerchantView;
});