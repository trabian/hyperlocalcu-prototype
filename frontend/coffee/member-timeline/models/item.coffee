# An Item is a timeline event such as a transaction or other non-transactional event to be presented on the timeline.
define ['lib/models/custom_sync'], (CustomSync) ->

  class Item extends Backbone.Model

    initialize: ->
      this.sync = CustomSync
      this.member = window.member

    addMerchant: (merchant) =>

      params =
        url: "#{this.url()}/add_merchant"
        type: 'POST'
        contentType: 'application/json'

        data: JSON.stringify
          merchant: merchant

        dataType: 'json'
        processData: false
        success: (resp) =>
          this.set(this.parse(resp))

      $.ajax params

    toUpdateJSON: =>
      item:
        rating: this.get('rating')
        name: this.get('name')

    # Toggle whether this item is selected in the timeline view.
    toggleSelected: ->
      this.set(selected: ! this.get('selected'))

    # Convert timestamps from 2010-10-28 to 10/28.
    formatted_timestamp: =>

      [date, time] = this.get('timestamp').split('T')
      [year, month, day] = date.split('-')

      [month, day].join('/')

    # Move the negative sign in front of the dollar sign for negative amounts and wrap the dollar
    # sign in <span class="currency"> to allow font customization.
    formatted_amount: =>

      sign = if this.get('amount') < 0 then '<span class="sign">-</span>' else ''
      "#{sign}<span class='currency'>$</span>#{Math.abs(this.get('amount')).toFixed(2)}"

    formatted_address: =>
      merchant = this.get('merchant')
      merchant.address_summary if merchant?

    toMerchantJSON: =>
      _.extend this.toJSON(),
        formatted_address: this.formatted_address()

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      merchant = this.get('merchant')
      _.extend this.toJSON(),
        formatted_timestamp: @formatted_timestamp
        formatted_amount: @formatted_amount
        offer: merchant.offers[0] if merchant? && merchant.offers?
