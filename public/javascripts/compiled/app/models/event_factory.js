App.EventFactory = {
  getEvent: function(model) {
    var event_class;
    event_class = App.EventFactory[model.event_type] || App.Event;
    return new event_class(model);
  }
};