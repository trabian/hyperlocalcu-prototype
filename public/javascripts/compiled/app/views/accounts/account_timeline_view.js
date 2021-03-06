var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.AccountTimeline = (function() {
  function AccountTimeline() {
    this.buildView = __bind(this.buildView, this);;
    this.render = __bind(this.render, this);;    AccountTimeline.__super__.constructor.apply(this, arguments);
  }
  __extends(AccountTimeline, Backbone.View);
  AccountTimeline.prototype.id = 'account-timeline';
  AccountTimeline.prototype.initialize = function() {
    this.bindTimeline();
    this.template = App.templates['accounts/timeline'];
    this.collection = this.model.events;
    this.collection.bind('refresh', this.addAll);
    return this.rowFactory = new App.view.MemberTimelineRowFactory;
  };
  AccountTimeline.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON));
    this.eventContainer = this.$('tbody');
    if (this.collection.fetched != null) {
      this.addAll();
    } else {
      this.collection.fetched = true;
      this.collection.fetch();
    }
    this.$('.search button').button({
      icons: {
        primary: 'ui-icon-search'
      }
    });
    return this;
  };
  AccountTimeline.prototype.buildView = function(model) {
    return this.rowFactory.build(model, this.collection);
  };
  return AccountTimeline;
})();
_.extend(App.view.AccountTimeline.prototype, App.view.extension.Timeline);