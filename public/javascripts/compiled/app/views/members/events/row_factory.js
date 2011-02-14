App.view.MemberTimelineRowFactory = (function() {
  function MemberTimelineRowFactory() {}
  MemberTimelineRowFactory.prototype.build = function(event, collection) {
    var row_view_class, view;
    this.row_views || (this.row_views = {
      atm: App.view.AtmRow,
      statement: App.view.StatementRow
    });
    row_view_class = this.row_views[event.get('event_type')] || App.view.EventRow;
    return view = new row_view_class({
      model: event,
      collection: collection,
      id: event.id,
      className: event.className
    });
  };
  return MemberTimelineRowFactory;
})();