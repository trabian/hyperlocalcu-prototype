class MemberTimelineRowFactory

  build: (event, collection) ->

    @row_views ||=
      atm: AtmRow
      statement: StatementRow

    row_view_class = @row_views[event.get('event_type')] || EventRowView

    view = new row_view_class
      model: event
      collection: collection
      id: event.id
      className: event.className

