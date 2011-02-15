App.view.FeedbackRowFactory = (function() {
  function FeedbackRowFactory() {}
  FeedbackRowFactory.prototype.build = function(event, collection) {
    var view;
    return view = new App.view.FeedbackRow({
      model: event,
      collection: collection,
      id: event.id,
      className: event.className
    });
  };
  return FeedbackRowFactory;
})();