class App.view.MemberTimelineRowFactory

  build: (event, collection) ->

    @row_views ||=
      atm: App.view.AtmRow
      statement: App.view.StatementRow

    row_view_class = @row_views[event.get('event_type')] || App.view.EventRow

    view = new row_view_class
      model: event
      collection: collection
      id: event.id
      className: event.className

