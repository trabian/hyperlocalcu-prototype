var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/highcharts'], function(highcharts) {
  var SalesChartView;
  SalesChartView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(SalesChartView, Backbone.View);
  SalesChartView.prototype.el = $('#sales-chart');
  SalesChartView.prototype.initialize = function() {
    return this.render();
  };
  SalesChartView.prototype.render = function() {
    var _a, sales, series, subtitle;
    sales = this.model.get('sales');
    series = {
      data: sales,
      name: 'November Sales',
      pointInterval: 24 * 2600 * 1000,
      pointStart: Date.UTC(2010, 0, 1)
    };
    subtitle = (typeof (_a = document.ontouchstart) !== "undefined" && _a !== null) ? "Drag your finger over the plot to zoom in" : "Click and drag in the plot area to zoom in";
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: 'sales-chart',
        zoomType: 'x',
        width: 570,
        height: 300,
        type: 'area'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Sales to Members'
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        type: 'datetime',
        maxZoom: 5 * 24 * 3600000,
        title: {
          text: null
        },
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%b %e', this.value);
          }
        }
      },
      yAxis: {
        title: {
          text: false
        },
        startOnTick: false,
        showFirstLabel: false,
        labels: {
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value, 0, ',');
          }
        }
      },
      series: [series],
      legend: {
        enabled: false
      },
      tooltip: {
        shared: true,
        formatter: function() {
          var pointAmount, pointDate;
          pointDate = Highcharts.dateFormat('%b %e', this.x);
          pointAmount = '$' + Highcharts.numberFormat(this.points[0].y, 0, ',');
          return "" + (pointDate) + ": " + (pointAmount);
        }
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [[0, '#A7CFE6'], [1, '#fff']]
          },
          lineWidth: 1,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 3
              }
            }
          },
          shadow: false,
          states: {
            hover: {
              lineWidth: 1
            }
          }
        }
      }
    });
    return $(this.el).show();
  };
  return SalesChartView;
});