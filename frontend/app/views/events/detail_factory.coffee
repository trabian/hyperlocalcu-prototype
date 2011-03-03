App.view.EventDetailFactory = {

  getEventDetailView: (model, parent) ->

    event_detail_view_class = App.view.EventDetailFactory[model.get('event_type')]

    return null unless event_detail_view_class?

    new event_detail_view_class
      model: model
      parent: parent

}
