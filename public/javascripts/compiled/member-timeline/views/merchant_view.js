var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=15", "member-timeline/views/offer_view", "social/views/tweet_view"], function(jqueryUI, sidebarTemplate, OfferView, TweetView) {
  var MerchantView;
  MerchantView = function() {
    var _a;
    _a = this;
    this.render = function(){ return MerchantView.prototype.render.apply(_a, arguments); };
    this.close = function(){ return MerchantView.prototype.close.apply(_a, arguments); };
    this.onChange = function(){ return MerchantView.prototype.onChange.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantView, Backbone.View);
  MerchantView.prototype.events = {
    "click .close": "close"
  };
  MerchantView.prototype.template = Handlebars.compile(sidebarTemplate);
  MerchantView.prototype.initialize = function() {
    this.model.bind('change', this.onChange);
    return _.extend(this, Backbone.Events);
  };
  MerchantView.prototype.onChange = function() {
    var _a, _b, _c;
    if (!((function(){ for (var _b=0, _c=(_a = _.keys(this.model.changedAttributes())).length; _b<_c; _b++) { if (_a[_b] === 'selected') return true; } return false; }).call(this))) {
      return this.render();
    }
  };
  MerchantView.prototype.close = function() {
    return this.model.set({
      'selected': false
    });
  };
  MerchantView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toMerchantJSON()));
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
    var _a, form, merchant, methodInput;
    merchant = this.model.get('merchant');
    if (typeof (_a = (typeof merchant === "undefined" || merchant === null) ? undefined : merchant.offers) !== "undefined" && _a !== null) {
      form = this.make('form', {
        action: ("/items/" + (this.model.id) + "/feedback"),
        method: 'post',
        "class": 'offer'
      });
      methodInput = this.make('input', {
        type: "hidden",
        name: "_method",
        value: "put"
      });
      $(form).append(methodInput);
      $(this.el).append(form);
      return (this.offerView = new OfferView({
        model: merchant.offers[0],
        el: form,
        item: this.model
      }));
    }
  };
  return MerchantView;
});