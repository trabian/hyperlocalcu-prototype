var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['member-timeline/views/item_view'], function(ItemView) {
  var TimelineView;
  TimelineView = function() {
    var _a;
    _a = this;
    this.addAll = function(){ return TimelineView.prototype.addAll.apply(_a, arguments); };
    this.addOne = function(){ return TimelineView.prototype.addOne.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(TimelineView, Backbone.View);
  TimelineView.prototype.el = $('#timeline tbody');
  TimelineView.prototype.initialize = function(items) {
    this.items = items;
    return this.items.bind('refresh', this.addAll);
  };
  TimelineView.prototype.addOne = function(item) {
    var view;
    view = new ItemView({
      model: item,
      collection: this.items,
      id: item.id
    });
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, item);
  };
  TimelineView.prototype.addAll = function() {
    this.items.each(this.addOne);
    return this.addRating();
  };
  TimelineView.prototype.addTimestampClass = function(view, item) {
    if (item.get('timestamp') === this.lastTimestamp) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastTimestamp = item.get('timestamp'));
  };
  TimelineView.prototype.addRating = function() {
    var itemList;
    itemList = this.items;
    return this.$('.rating').raty({
      path: '/images/raty/',
      onClick: function(rating) {
        var item, item_id;
        $(this).toggleClass('active', rating > 0);
        item_id = $(this).closest('tr').attr('id');
        item = itemList.get(item_id);
        return item.set({
          rating: rating
        });
      }
    });
  };
  return TimelineView;
});