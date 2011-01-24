define ['app/views/members/events/row', 'app/views/members/events/atm/row', 'app/views/members/events/statement/row'], (EventRowView, AtmRow, StatementRow) ->

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

