# The collection of [events](event.html) is backed by a JSON store.
class App.model.FeedbackList extends Backbone.Collection

  model: App.model.Feedback

  initialize: (collection, options) ->
    @event = options.event

  for_subject: (subject_key) =>

    feedback = this.find (feedback) =>
      feedback.get('subject_key') == subject_key

    unless feedback?
      feedback = new App.model.Feedback {
          subject_key: subject_key
        },
        collection: this

    feedback.subject = App.model.FeedbackSubjectFactory.getSubject(@event.get(subject_key))

    feedback
