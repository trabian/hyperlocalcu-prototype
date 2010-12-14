var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "text!views/member/overview.handlebars?version=3"], function(jqueryUI, overviewTemplate) {
  var MemberOverviewView;
  MemberOverviewView = function() {
    var _a;
    _a = this;
    this.hide = function(){ return MemberOverviewView.prototype.hide.apply(_a, arguments); };
    this.show = function(){ return MemberOverviewView.prototype.show.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MemberOverviewView, Backbone.View);
  MemberOverviewView.prototype.template = Handlebars.compile(overviewTemplate);
  MemberOverviewView.prototype.initialize = function() {
    return this.render();
  };
  MemberOverviewView.prototype.show = function() {
    return $(this.el).show();
  };
  MemberOverviewView.prototype.hide = function() {
    return $(this.el).hide();
  };
  MemberOverviewView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this.$('.timeframe span').button({
      icons: {
        primary: 'ui-icon-calendar',
        secondary: "ui-icon-triangle-1-s"
      }
    });
  };
  return MemberOverviewView;
});