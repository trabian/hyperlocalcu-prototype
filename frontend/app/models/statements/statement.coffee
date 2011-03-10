class App.model.Statement extends Backbone.Model

  formattedStatementDate: =>
    this.formatDate(this.get('statement_date'), 'M. yy')

  toViewJSON: ->
    _.extend this.toJSON(),
      formattedStatementDate: @formattedStatementDate

_.extend App.model.Statement.prototype, App.model.extension.Dates
