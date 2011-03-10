class App.view.StatementList extends Backbone.View

  initialize: (options) ->

  render: =>

    statementList = this.make('ul', { className: 'statements'})

    @collection.each (statement) =>
      $(statementList).append this.make('li', { className: 'statement' }, 'Testing')

    $(@el).html statementList

    return this
