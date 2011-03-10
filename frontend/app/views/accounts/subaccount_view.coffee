class App.view.Subaccount extends Backbone.View

  className: 'subaccount'

  initialize: (options) ->

    @template = App.templates['accounts/subaccount']

    @model.bind 'change', @render

    @model.events.bind 'refresh', @renderChart

  render: =>

    $(@el).html @template(@model.toViewJSON())

    selected = @model.get('selected') is true

    $(@el).toggleClass 'selected', selected

    this.renderStatements()

    if @model.events.fetched?
      this.renderChart()

    return this

  renderStatements: =>

    statementList = new App.view.StatementList
      collection: @model.statements

    this.$('.left').append statementList.render().el

  renderChart: =>

    unless @model.events.length == 0

      if @model.get('selected') is true

        balanceChart = new App.view.BalanceChart
          model: @model
          el: this.$('#balance-chart')

        $(@el).append balanceChart.render().el
