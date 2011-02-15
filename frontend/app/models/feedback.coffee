class App.model.Feedback extends Backbone.Model

  initialize: ->
    this.sync = App.model.CustomSync

  toUpdateJSON: =>
    subject:
      key: this.get('subject_key')
      id: this.subject.id
    feedback:
      rating: this.get('rating')
      comment: this.get('comment')

  toViewJSON: ->
    _.extend this.toJSON(),
      formatted_timestamp: @formatted_timestamp
      formatted_service_timestamp: @formatted_service_timestamp

  # These need to be refactored into a helper at some point
  splitDate: (date) =>
    [date, time] = date.split('T')
    date.split('-')

  formatDate: (date) =>
    [year, month, day] = this.splitDate(date)
    [month, day].join('/')

  # Convert timestamps from 2010-10-28 to 10/28.
  formatted_timestamp: =>
    this.formatDate this.get('created_at')

  formatted_service_timestamp: =>
    this.formatDate this.get('event_posted_at')

  day: =>
    [year, month, day] = this.splitDate(this.get('created_at'))
    [year, month, day].join('-')

