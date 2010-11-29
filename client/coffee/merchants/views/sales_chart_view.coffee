define ['vendor/highcharts'], (highcharts) ->

  class SalesChartView extends Backbone.View

    el: $('#sales-chart')

    initialize: ->

      this.render()

    render: ->

      sales = @model.get('sales')

      series = {
        data: sales
        name: 'November Sales'
        pointInterval: 24 * 2600 * 1000
        pointStart: Date.UTC(2010, 0, 1)
      }

      subtitle = if document.ontouchstart? then "Drag your finger over the plot to zoom in" else "Click and drag in the plot area to zoom in"

      @chart = new Highcharts.Chart
        chart:
          renderTo: 'sales-chart'
          zoomType: 'x'
          width: 570
          height: 300
          type: 'area'
        credits:
          enabled: false
        title:
          text: 'Sales to Members'
        subtitle:
          text: subtitle
        xAxis:
          type: 'datetime'
          maxZoom: 5 * 24 * 3600000
          title:
            text: null
          labels:
            formatter: ->
              Highcharts.dateFormat('%b %e', this.value)
        yAxis:
          title:
            text: false
          startOnTick: false
          showFirstLabel: false
          labels:
            formatter: ->
              '$' + Highcharts.numberFormat(this.value, 0, ',')
        series: [series]
        legend:
          enabled: false
        tooltip:
          shared: true
          formatter: ->
            pointDate = Highcharts.dateFormat('%b %e', this.x)
            pointAmount = '$' + Highcharts.numberFormat(this.points[0].y, 0, ',')
            "#{pointDate}: #{pointAmount}"
        plotOptions:
          area:
            fillColor:
              linearGradient: [0, 0, 0, 300]
              stops: [ [0, '#A7CFE6'], [1, '#fff'] ]
            lineWidth: 1
            marker:
              enabled: false
              states:
                hover:
                  enabled: true
                  radius: 3
            shadow: false
            states:
              hover:
                lineWidth: 1

      $(@el).show()
