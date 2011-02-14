App.EventFactory = {

  getEvent: (model) ->

    event_class = App.EventFactory[model.event_type] || App.Event

    new event_class(model)

}
