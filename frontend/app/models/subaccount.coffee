class App.model.Subaccount extends Backbone.Model

  toViewJSON: ->

    _.extend this.toJSON(),
      formattedBalance: App.helper.currency.format(this.get('balance'))
      formattedAvailableBalance: if this.get('balance') == this.get('available_balance') then null else App.helper.currency.format(this.get('available_balance'))
