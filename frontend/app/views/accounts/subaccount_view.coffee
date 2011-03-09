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

    if @model.events.fetched?
      this.renderChart()

    return this

  renderChart: =>

    try

      if @model.get('selected') is true

        balanceChart = new App.view.BalanceChart
          model: @model
          el: this.$('#balance-chart')

        $(@el).append balanceChart.render().el

    catch error
      console.log error
