App.model.FeedbackSubjectFactory = {

  getSubject: (model) ->

    feedback_subject_class = App.model.FeedbackSubjectFactory[model.feedback_subject_type] || App.model.FeedbackSubject

    new feedback_subject_class(model)

}
