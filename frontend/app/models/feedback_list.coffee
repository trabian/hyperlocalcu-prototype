# The collection of [events](event.html) is backed by a JSON store.
define ['app/models/feedback'], (Feedback) ->

  class FeedbackList extends Backbone.Collection

    model: Feedback
