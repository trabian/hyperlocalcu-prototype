# An Item is a timeline event such as a transaction or other non-transactional event to be presented on the timeline.
define ->

  class Item extends Backbone.Model

    # Toggle whether this item is selected in the timeline view.
    toggleSelected: ->
      this.set(selected: ! this.get('selected'))

    # Convert timestamps from 2010-10-28 to 10/28.
    formatted_timestamp: ->
      if @timestamp
        @timestamp.split('-').slice(1).join('/')
      else
        ""

    # Move the negative sign in front of the dollar sign for negative amounts and wrap the dollar
    # sign in <span class="currency"> to allow font customization.
    formatted_amount: ->
      sign = if @amount < 0 then '<span class="sign">-</span>' else ''
      "#{sign}<span class='currency'>$</span>#{Math.abs(@amount).toFixed(2)}"

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      merchant = this.get('merchant')
      _.extend this.toJSON(),
        formatted_timestamp: @formatted_timestamp
        formatted_amount: @formatted_amount
        offer: merchant.offers[0] if merchant? && merchant.offers?
