define ['app/lib/models/custom_sync', 'app/models/event'], (CustomSync, Event) ->

  class Feedback extends Backbone.Model

    initialize: ->

      this.sync = CustomSync

    toUpdateJSON: =>
      subject:
        key: this.get('subject_key')
        id: this.subject.id
      feedback:
        rating: this.get('rating')
        comment: this.get('comment')
