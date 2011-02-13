define(['app/views/common/feedback/timeline/row'], function(FeedbackRowView) {
  var FeedbackRowFactory;
  return FeedbackRowFactory = (function() {
    function FeedbackRowFactory() {}
    FeedbackRowFactory.prototype.build = function(event, collection) {
      var view;
      return view = new FeedbackRowView({
        model: event,
        collection: collection,
        id: event.id,
        className: event.className
      });
    };
    return FeedbackRowFactory;
  })();
});