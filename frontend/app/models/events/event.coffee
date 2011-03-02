# An Event is a timeline event such as a transaction or other non-transactional event to be presented on the timeline.
class App.model.Event extends Backbone.Model

  initialize: ->

    this.sync = App.model.CustomSync
    this.member = App.currentMember

    @updateFields = []

    @feedbacks = new App.model.FeedbackList
      event: this

    @feedbacks.url = "/events/#{@id}/feedbacks"

    this.bind 'change', @trackEventActivity


  splitPostedAt: =>

    [date, time] = this.get('posted_at').split('T')
    date.split('-')

  # Convert timestamps from 2010-10-28 to 10/28.
  formatted_timestamp: =>

    [year, month, day] = this.splitPostedAt()

    [month, day].join('/')

  formatted_date: =>
    this.formatDate this.get('posted_at'), 'DD, MM d, yy'

  day: =>

    [year, month, day] = this.splitPostedAt()
    [year, month, day].join('-')

  formatCurrency: (amount) =>
    App.helper.currency.format(amount)

  formatDate: (date, format) ->

    format or= 'm/d/yy'

    $.datepicker.formatDate(format, $.datepicker.parseDate('yy-m-d', date))

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

  map: =>
    "http://www.google.com/maps/vt/data=LtgX-e3f8ctI3U5dJtbt7EJ1ZfRneYme,xr1VycLGhw6JTyXHga0_5_rOcUkmBglaDj54UK1Pl3Q61KqxI7PKrPOitiqBc3I6vhIGdvPSpmb2yZN3Xv4RQ09i_YMotqFsn2SrqspXx-0c8v2Xkw"

  className: =>
    this.depositOrWithdrawal().toLowerCase()

  # Add the formatted timestamp and amount to the json for the view
  toViewJSON: ->
    _.extend this.toJSON(),
      description: @description
      meta: @meta
      html_class: @html_class
      formatted_timestamp: @formatted_timestamp
      formatted_date: @formatted_date
      formatted_amount: @formatted_amount
      map: @map

  toDetailJSON: ->
    this.toViewJSON()

  toUpdateJSON: =>
    eventFields = {}
    _.each @updateFields, (field) =>
      eventFields[field] = this.get(field)
    event:
      eventFields

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
