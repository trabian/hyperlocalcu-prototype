# An Event is a timeline event such as a transaction or other non-transactional event to be presented on the timeline.
define ['lib/models/custom_sync'], (CustomSync) ->

  class Event extends Backbone.Model

    initialize: ->
      this.sync = CustomSync

    # Convert timestamps from 2010-10-28 to 10/28.
    formatted_timestamp: =>

      [date, time] = this.get('posted_at').split('T')
      [year, month, day] = date.split('-')

      [month, day].join('/')

    # Move the negative sign in front of the dollar sign for negative amounts and wrap the dollar
    # sign in <span class="currency"> to allow font customization.
    formatted_amount: =>

      sign = if this.get('amount') < 0 then '<span class="sign">-</span>' else ''
      "#{sign}<span class='currency'>$</span>#{Math.abs(this.get('amount')).toFixed(2)}"

    description: =>
      "Test Description"

    meta: =>
      "Test Meta"

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      _.extend this.toJSON(),
        description: @description
        meta: @meta
        formatted_timestamp: @formatted_timestamp
        formatted_amount: @formatted_amount
