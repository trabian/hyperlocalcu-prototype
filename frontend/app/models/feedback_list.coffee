# The collection of [events](event.html) is backed by a JSON store.
class App.model.FeedbackList extends Backbone.Collection

  model: App.model.Feedback

  initialize: (collection, options) ->
    @event = options.event
    @url = options.url

  for_subject: (subject_type) =>

    feedback = this.find (feedback) =>
      feedback.get('subject_type') == subject_type

    unless feedback?
      feedback = new App.model.Feedback {
          subject_type: subject_type
        },
        collection: this

    feedback.subject = App.model.FeedbackSubjectFactory.getSubject(@event.get(subject_type))

    feedback

  fetchIfNeeded: (options) =>

    if this.fetched
      options.success(this)
    else
      this.fetched = true
      this.fetch options
