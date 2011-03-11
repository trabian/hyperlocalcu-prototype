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

    chart = new Highcharts.Chart
      chart:
        renderTo: 'balance-chart'
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
        tickInterval: 24 * 3600 * 1000
        gridLineWidth: 1
        showFirstLabel: false
        tickPosition: 'inside'
        labels:
          y: -4
          x: -14
          step: 2
          style: fontStyle
      yAxis:
        gridLineColor: "#ddd"
        tickWidth: 0
        minorTickWidth: 0
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
          style: fontStyle
          y: 12 
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
        borderColor: "#4497cd"
      plotOptions:
        area:
          fillColor: 'rgba(68, 151, 205, 0.05)'
          animation: 5000
          lineWidth: 1
          lineColor: 'rgba(68, 151, 205, 0.7)'
          shadow: false
          events:
            click: @expandChart
          states:
            hover:
              enabled: true
              marker:
                lineWidth: 1
                lineColor: 'rgba(68, 151, 205, 1)'
          marker:
            lineColor: 'rgba(68, 151, 205, 1)'
            radius: 1.4
            states:
              hover:
                enabled: true
                radius: 2.4 

    return this
