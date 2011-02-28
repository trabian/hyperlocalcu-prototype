class App.model.SubaccountList extends Backbone.Collection

  model: App.model.Subaccount

_.extend App.model.SubaccountList.prototype, App.model.extension.Selectable
