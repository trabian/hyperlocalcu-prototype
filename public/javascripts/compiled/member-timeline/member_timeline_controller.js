var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["member-timeline/views/timeline_view", "member-timeline/models/item_list", "member-timeline/views/merchant_view", "member-timeline/views/member_overview_view"], function(TimelineView, ItemList, MerchantView, MemberOverviewView) {
  var MemberTimelineController;
  MemberTimelineController = function() {
    var _a;
    _a = this;
    this.showItem = function(){ return MemberTimelineController.prototype.showItem.apply(_a, arguments); };
    this.changeSelected = function(){ return MemberTimelineController.prototype.changeSelected.apply(_a, arguments); };
    this.selectItem = function(){ return MemberTimelineController.prototype.selectItem.apply(_a, arguments); };
    this.setupMemberOverviewView = function(){ return MemberTimelineController.prototype.setupMemberOverviewView.apply(_a, arguments); };
    this.setupTimelineView = function(){ return MemberTimelineController.prototype.setupTimelineView.apply(_a, arguments); };
    this.setupItemList = function(){ return MemberTimelineController.prototype.setupItemList.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MemberTimelineController, Backbone.Controller);
  MemberTimelineController.prototype.initialize = function(options) {
    this.setupItemList();
    this.setupTimelineView();
    this.setupMemberOverviewView();
    if (options.fetchOnInit === true) {
      return this.fetch();
    }
  };
  MemberTimelineController.prototype.setupItemList = function() {
    this.items = new ItemList();
    this.items.bind('change:selected', this.changeSelected);
    return this.items.bind('unselect', __bind(function() {
      return this.saveLocation('');
    }, this));
  };
  MemberTimelineController.prototype.setupTimelineView = function() {
    return (this.timelineView = new TimelineView(this.items));
  };
  MemberTimelineController.prototype.setupMemberOverviewView = function() {
    return (this.memberOverviewView = new MemberOverviewView({
      el: $('#overview'),
      model: options.member
    }));
  };
  MemberTimelineController.prototype.routes = {
    "items/:itemId": 'selectItem'
  };
  MemberTimelineController.prototype.selectItem = function(itemId) {
    return this.items.selectOne(this.items.get(itemId));
  };
  MemberTimelineController.prototype.fetch = function() {
    return this.items.fetch({
      success: function() {
        $('#timeline-loading').hide();
        $('#timeline').show();
        return Backbone.history.start();
      }
    });
  };
  MemberTimelineController.prototype.changeSelected = function(item) {
    if (item.get('selected')) {
      this.saveLocation("items/" + (item.id));
      return this.showItem(item);
    } else {
      return this.merchantView.hide();
    }
  };
  MemberTimelineController.prototype.showItem = function(item) {
    this.merchantView = new MerchantView({
      model: item,
      el: $('#merchant-view')
    });
    this.merchantView.bind('show', this.memberOverviewView.hide);
    this.merchantView.bind('hide', this.memberOverviewView.show);
    return this.merchantView.render();
  };
  return MemberTimelineController;
});