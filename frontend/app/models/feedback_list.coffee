# The collection of [events](event.html) is backed by a JSON store.
define ['app/models/feedback', 'app/models/feedback_subject'], (Feedback, FeedbackSubject) ->

  class FeedbackList extends Backbone.Collection

    model: Feedback

    initialize: (collection, options) ->
      @event = options.event

    for_subject: (subject_key) =>

      feedback = this.find (feedback) =>
        feedback.get('subject_key') == subject_key

      unless feedback?
        feedback = new Feedback {
            subject_key: subject_key
          },
          collection: this

      feedback.subject = new FeedbackSubject(@event.get(subject_key))

      feedback
