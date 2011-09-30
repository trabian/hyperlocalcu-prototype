class App.view.BalanceChart extends Backbone.View

  initialize: (options) ->
    @balances = @model.dailyBalances()[0...5]

  toNext: (number, scale) ->
    Math.ceil(number/scale) * scale

  toPrev: (number, scale) ->
    Math.floor(number/scale) * scale

  expandChart: (e) =>
    alert 'Eventually show the full chart'

  render: =>

    @chart = new Highcharts.Chart @chartOptions('balance-chart-summary', false)

    @detailChart = new Highcharts.Chart @chartOptions('balance-chart-detail', true)

    $(@el).hover @addChartDetail, @removeChartDetail

    return this

  chartOptions: (elementId, showDetail) =>

    maxBalance = _.max @balances, (balance) ->
      balance[1]

    minBalance = _.min @balances, (balance) ->
      balance[1]

    maxBalance = maxBalance?[1]
    minBalance = minBalance?[1]

    tickInterval = 0

    if maxBalance < 1000
      maxBalance = this.toNext(maxBalance, 100)
      minBalance = this.toPrev(minBalance, 100)
    else if maxBalance > 100000
      maxBalance = this.toNext(maxBalance, 1000000)
      minBalance = this.toPrev(maxBalance, 1000000)
    else
      maxBalance = this.toNext(maxBalance, 1000)
      minBalance = this.toPrev(minBalance, 1000)

    tickInterval = (maxBalance - minBalance) / 4
    lineColor = "#f3f3f3"

    fontStyle =
      fontSize: '9px'
      color: '#999'

    series =
      data: @balances


    options =
      chart:
        renderTo: elementId
        width: 150
        height: 75
        type: 'area'
        alignTicks: false
        borderWidth: 0
        borderRadius: 0
        marginTop: 1
        marginBottom: 1
        marginLeft: 0
        marginRight: 1
        events:
          click: @expandChart
        style:
          cursor: "pointer"
      title:
        text: null
      credits:
        enabled: false
      xAxis:
        type: 'datetime'
        title:
          text: null
        dateTimeLabelFormats:
          day: '%b %e'
        gridLineColor: lineColor
        minorGridLineColor: lineColor
        lineWidth: if showDetail then 1 else 0
        tickWidth: if showDetail then 1 else 0
        tickInterval: 24 * 3600 * 1000
        gridLineWidth: if showDetail then 1 else 0
        showFirstLabel: false
        tickPosition: 'inside'
        labels:
          enabled: showDetail
          y: -2
          x: -14
          step: 2
          style: fontStyle
      yAxis:
        gridLineColor: "#ddd"
        gridLineWidth: if showDetail then 1 else 0
        lineWidth: if showDetail then 1 else 0
        tickWidth: 0
        minorTickWidth: 1
        minorGridLineColor: lineColor
        title:
          text: false
        showFirstLabel: false
        startOnTick: false
        minorTickInterval: tickInterval
        tickInterval: tickInterval * 2
        max: maxBalance
        min: minBalance
        labels:
          enabled: showDetail
          style: fontStyle
          y: -2 
          x: 35
          formatter: ->

            ret = null
            value = this.value

            if (tickInterval % 1000000) is 0
              ret = (value / 1000000) + 'M'
            else if (tickInterval % 1000) is 0
              ret = (value / 1000) + 'k'
            else
              ret = Highcharts.numberFormat(value, 0, ',')

            '$' + ret

      series: [series]
      legend:
        enabled: false
      tooltip:
        formatter: ->
          '$' + Highcharts.numberFormat(this.y, 0, ',')
        style:
          fontSize: '11px'
          padding: "5px 10px"
        borderRadius: 2
        borderWidth: 1
        borderColor: "#ccc"
      plotOptions:
        area:
          fillColor: 'rgba(0, 0, 0, 0.05)'
          animation: 5000
          lineWidth: 1
          lineColor: 'rgba(0, 0, 0, 0.25)'
          shadow: false
          events:
            click: @expandChart
          states:
            hover:
              enabled: true
              marker:
                lineWidth: 1
                lineColor: 'rgba(0, 0, 0, 0.7)'
          marker:
            lineColor: 'rgba(0, 0, 0, 0.5)'
            radius: 1.4
            states:
              hover:
                enabled: true
                radius: 2.4 

  addChartDetail: =>
    this.$('.chart-summary').hide()
    this.$('.chart-detail').show()

  removeChartDetail: =>
    this.$('.chart-summary').show()
    this.$('.chart-detail').hide()
