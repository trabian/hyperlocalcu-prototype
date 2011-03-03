App.model.EventFactory = {
  getEvent: function(model) {
    var event_class;
    event_class = App.model.EventFactory[model.event_type] || App.model.Event;
    return new event_class(model);
  }
};