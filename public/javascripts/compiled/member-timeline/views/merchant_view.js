var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "text!views/merchants/sidebar.handlebars?version=17", "member-timeline/views/offer_view", "member-timeline/views/social_view", "member-timeline/views/merchant_search_view", "merchants/models/merchant"], function(jqueryUI, sidebarTemplate, OfferView, SocialView, MerchantSearchView, Merchant) {
  var MerchantView;
  MerchantView = function() {
    var _a;
    _a = this;
    this.toggleSocial = function(){ return MerchantView.prototype.toggleSocial.apply(_a, arguments); };
    this.render = function(){ return MerchantView.prototype.render.apply(_a, arguments); };
    this.updateAvatar = function(){ return MerchantView.prototype.updateAvatar.apply(_a, arguments); };
    this.close = function(){ return MerchantView.prototype.close.apply(_a, arguments); };
    this.onChange = function(){ return MerchantView.prototype.onChange.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantView, Backbone.View);
  MerchantView.prototype.events = {
    "click .avatar": "toggleSocial",
    "click .close": "close"
  };
  MerchantView.prototype.template = Handlebars.compile(sidebarTemplate);
  MerchantView.prototype.initialize = function() {
    this.model.bind('change:merchant', this.onChange);
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
  MerchantView.prototype.updateAvatar = function() {
    return this.$('img.avatar').attr('src', this.merchant.get('avatar'));
  };
  MerchantView.prototype.render = function() {
    var _a, _b, _c, merchantSearchView;
    $(this.el).html(this.template(this.model.toMerchantJSON()));
    if (typeof (_a = this.model.get('merchant')) !== "undefined" && _a !== null) {
      this.merchant = new Merchant(this.model.get('merchant'));
      this.merchant.bind('change:avatar', this.updateAvatar);
    }
    if (typeof (_b = this.merchant) !== "undefined" && _b !== null) {
      this.socialView = new SocialView({
        model: this.merchant
      });
      $(this.el).append(this.socialView.render().el);
    }
    this.$('.close').button({
      icons: {
        primary: 'ui-icon-close'
      }
    });
    this.trigger('show');
    $(this.el).show();
    if (!(typeof (_c = this.model.get('merchant')) !== "undefined" && _c !== null)) {
      merchantSearchView = new MerchantSearchView({
        model: this.model
      });
      return $(this.el).append(merchantSearchView.render().el);
    }
  };
  MerchantView.prototype.hide = function() {
    this.trigger('hide');
    return $(this.el).empty().hide();
  };
  MerchantView.prototype.toggleSocial = function() {
    return this.$('.social').toggle();
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