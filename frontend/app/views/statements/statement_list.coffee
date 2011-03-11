class App.view.StatementList extends Backbone.View

  initialize: (options) ->
    @template = App.templates['statements/statement_list']
    @statementTemplate = App.templates['statements/statement']

  render: =>

    unless @collection.isEmpty()

      $(@el).html @template()

      statementList = this.$('.statements')

      visibleStatements = @collection.toArray().slice(0, @options.visible)

      _.each visibleStatements, (statement, index) =>

        $(statementList).append @statementTemplate(statement.toViewJSON())

      if @collection.length > @options.visible
        # Not the prettiest way of doing this
        $(statementList).append this.make('li', {}, "<a href='#' class='older'>Older &#9662;</a>")

    return this
