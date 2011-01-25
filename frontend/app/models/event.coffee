# An Event is a timeline event such as a transaction or other non-transactional event to be presented on the timeline.
define ['lib/models/custom_sync', 'app/models/feedback', 'app/models/feedback_subject', 'vendor/jquery-ui'], (CustomSync, Feedback, FeedbackSubject) ->

  class Event extends Backbone.Model

    initialize: ->

      this.sync = CustomSync

      @updateFields = ['vendor_rating', 'vendor_comment']

      this.bind 'change', @trackEventActivity

    splitPostedAt: =>

      [date, time] = this.get('posted_at').split('T')
      date.split('-')

    # Convert timestamps from 2010-10-28 to 10/28.
    formatted_timestamp: =>

      [year, month, day] = this.splitPostedAt()

      [month, day].join('/')

    day: =>

      [year, month, day] = this.splitPostedAt()
      [year, month, day].join('-')

    formatCurrency: (amount) =>

      sign = if amount < 0 then '<span class="sign">-</span>' else ''
      "#{sign}<span class='currency'>$</span>#{Math.abs(amount).toFixed(2)}"

    formatDate: (date) ->
      $.datepicker.formatDate('m/d/yy', $.datepicker.parseDate('yy-m-d', date))

    # Move the negative sign in front of the dollar sign for negative amounts and wrap the dollar
    # sign in <span class="currency"> to allow font customization.
    formatted_amount: =>
      this.formatCurrency(this.get('amount'))

    depositOrWithdrawal: ->
      if this.isDeposit() then "Deposit" else "Withdrawal"

    isDeposit: ->
      this.get('amount') > 0

    isSocial: ->
      false

    description: =>
      this.depositOrWithdrawal()

    meta: =>
      ''

    className: =>
      this.depositOrWithdrawal().toLowerCase()

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      _.extend this.toJSON(),
        description: @description
        meta: @meta
        html_class: @html_class
        formatted_timestamp: @formatted_timestamp
        formatted_amount: @formatted_amount

    toDetailJSON: ->
      this.toViewJSON()

    toUpdateJSON: =>
      eventFields = {}
      _.each @updateFields, (field) =>
        eventFields[field] = this.get(field)
      event:
        eventFields

    feedback_for_subject: (subject_type) =>

      feedback = new Feedback this.get('subject_feedbacks')[subject_type]

      feedback.subject = new FeedbackSubject(this.get(subject_type))

      feedback

    trackEventActivity: =>
      if this.hasChanged('teller_rating') || this.hasChanged('vendor_rating')
        mpq.push ['track', 'Provide event rating', {
          event_type: this.get('event_type')
          id: event.id
        }]
      if this.hasChanged('teller_comment') || this.hasChanged('vendor_comment')
        mpq.push ['track', 'Provide event comment', {
          event_type: this.get('event_type')
          id: event.id
        }]
