var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MemberDashboard = (function() {
  function MemberDashboard() {
    this.initEventDetailView = __bind(this.initEventDetailView, this);;
    this.renderEventDetail = __bind(this.renderEventDetail, this);;
    this.renderTimeline = __bind(this.renderTimeline, this);;
    this.render = __bind(this.render, this);;    MemberDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberDashboard, Backbone.View);
  MemberDashboard.prototype.initialize = function(options) {
    var subaccounts;
    if (this.model.accounts.length !== 0) {
      this.render();
      subaccounts = this.model.accounts.current().subaccounts;
      return subaccounts.bind('selectOne', this.renderTimeline);
    }
  };
  MemberDashboard.prototype.render = function() {
    this.accountView = new App.view.Account({
      model: this.model.accounts.current()
    });
    return $('#sidebar').html(this.accountView.render().el);
  };
  MemberDashboard.prototype.renderTimeline = function(subaccount) {
    this.timelineView = new App.view.AccountTimeline({
      model: subaccount
    });
    $('#main .content').html(this.timelineView.render().el);
    return subaccount.events.bind('selectOne', this.renderEventDetail);
  };
  MemberDashboard.prototype.renderEventDetail = function(event) {
    if (this.eventDetailView == null) {
      this.initEventDetailView();
    }
    this.eventDetailView.model = event;
    this.eventDetailView.maxHeight = $(this.timelineView.el).height() - 50;
    return $('#sidebar').append(this.eventDetailView.render().el);
  };
  MemberDashboard.prototype.initEventDetailView = function() {
    $('#sidebar').append(this.make('div', {
      id: 'event-detail-view'
    }));
    this.eventDetailView = new App.view.EventDetail({
      el: $('#event-detail-view')
    });
    this.eventDetailView.bind('show', __bind(function() {
      return $(this.accountView.el).hide();
    }, this));
    this.eventDetailView.bind('hide', __bind(function() {
      return $(this.accountView.el).show();
    }, this));
    $(this.eventDetailView.el).drawer({
      main: $('#main'),
      resizeOnInit: false,
      resize: __bind(function(element, height) {
        return this.eventDetailView.resize(height);
      }, this)
    });
    return this.eventDetailView.bind('rendered', __bind(function() {
      return $(this.eventDetailView.el).drawer('redraw');
    }, this));
  };
  return MemberDashboard;
})();