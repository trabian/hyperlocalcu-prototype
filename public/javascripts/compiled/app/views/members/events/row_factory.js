define(['app/views/members/events/row', 'app/views/members/events/atm/row', 'app/views/members/events/statement/row'], function(EventRowView, AtmRow, StatementRow) {
  var MemberTimelineRowFactory;
  MemberTimelineRowFactory = function() {};
  MemberTimelineRowFactory.prototype.build = function(event, collection) {
    var row_view_class, view;
    this.row_views || (this.row_views = {
      atm: AtmRow,
      statement: StatementRow
    });
    row_view_class = this.row_views[event.get('event_type')] || EventRowView;
    return (view = new row_view_class({
      model: event,
      collection: collection,
      id: event.id,
      className: event.className
    }));
  };
  return MemberTimelineRowFactory;
});