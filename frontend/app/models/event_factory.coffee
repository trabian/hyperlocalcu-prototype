App.model.EventFactory = {

  getEvent: (model) ->

    event_class = App.model.EventFactory[model.event_type] || App.model.Event

    new event_class(model)

}
