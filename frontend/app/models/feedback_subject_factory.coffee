FeedbackSubjectTypes = ['merchant', 'teller', 'vendor']

FeedbackSubjectTypeDefinitions = _.map FeedbackSubjectTypes, (feedback_subject_type) ->
  "app/models/#{feedback_subject_type}"

FeedbackSubjectTypeDefinitions.unshift 'app/models/feedback_subject'

define FeedbackSubjectTypeDefinitions, (feedback_subject_classes...) ->

  class FeedbackSubjectFactory

    getSubject: (model) ->

      index = _.indexOf(FeedbackSubjectTypes, model.feedback_subject_type) + 1

      feedback_subject_class = feedback_subject_classes[index] || feedback_subject_classes[0]

      new feedback_subject_class(model)

  return new FeedbackSubjectFactory()

