App.model.FeedbackSubjectFactory = {
  getSubject: function(model) {
    var feedback_subject_class;
    feedback_subject_class = App.model.FeedbackSubjectFactory[model.feedback_subject_type] || App.model.FeedbackSubject;
    return new feedback_subject_class(model);
  }
};