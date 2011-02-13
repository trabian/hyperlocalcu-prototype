var FeedbackSubjectTypeDefinitions, FeedbackSubjectTypes;
var __slice = Array.prototype.slice;
FeedbackSubjectTypes = ['merchant', 'teller', 'vendor'];
FeedbackSubjectTypeDefinitions = _.map(FeedbackSubjectTypes, function(feedback_subject_type) {
  return "app/models/" + feedback_subject_type;
});
FeedbackSubjectTypeDefinitions.unshift('app/models/feedback_subject');
define(FeedbackSubjectTypeDefinitions, function() {
  var FeedbackSubjectFactory, feedback_subject_classes;
  feedback_subject_classes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  FeedbackSubjectFactory = (function() {
    function FeedbackSubjectFactory() {}
    FeedbackSubjectFactory.prototype.getSubject = function(model) {
      var feedback_subject_class, index;
      index = _.indexOf(FeedbackSubjectTypes, model.feedback_subject_type) + 1;
      feedback_subject_class = feedback_subject_classes[index] || feedback_subject_classes[0];
      return new feedback_subject_class(model);
    };
    return FeedbackSubjectFactory;
  })();
  return new FeedbackSubjectFactory();
});