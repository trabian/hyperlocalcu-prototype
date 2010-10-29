define ->

  class Item extends Backbone.Model

    select: ->
      this.set('selected': ! this.get('selected'))

    formatted_timestamp: ->
      this.timestamp.split('-').slice(1).join('/')

    formatted_amount: ->
      sign = if this.amount < 0 then '<span class="sign">-</span>' else ''
      "#{sign}<span class='currency'>$</span>#{Math.abs(this.amount).toFixed(2)}"

    toViewJSON: ->
      _.extend this.toJSON(),
        formatted_timestamp: this.formatted_timestamp
        formatted_amount: this.formatted_amount
      
