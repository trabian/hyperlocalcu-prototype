class App.model.SubaccountList extends Backbone.Collection

  model: App.model.Subaccount

  total: ->

    summer = (memo, num) ->
      memo + num

    _.reduce(this.pluck('balance'), summer, 0)

_.extend App.model.SubaccountList.prototype, App.model.extension.Selectable
