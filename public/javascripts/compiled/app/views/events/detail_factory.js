App.view.EventDetailFactory = {
  getEventDetailView: function(model, parent) {
    var event_detail_view_class;
    event_detail_view_class = App.view.EventDetailFactory[model.get('event_type')];
    if (event_detail_view_class == null) {
      return null;
    }
    return new event_detail_view_class({
      model: model,
      parent: parent
    });
  }
};