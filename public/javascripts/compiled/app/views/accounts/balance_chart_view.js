var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.BalanceChart = (function() {
  function BalanceChart() {
    this.render = __bind(this.render, this);;
    this.expandChart = __bind(this.expandChart, this);;    BalanceChart.__super__.constructor.apply(this, arguments);
  }
  __extends(BalanceChart, Backbone.View);
  BalanceChart.prototype.initialize = function(options) {
    return this.balances = this.model.dailyBalances().slice(0, 5);
  };
  BalanceChart.prototype.toNext = function(number, scale) {
    return Math.ceil(number / scale) * scale;
  };
  BalanceChart.prototype.toPrev = function(number, scale) {
    return Math.floor(number / scale) * scale;
  };
  BalanceChart.prototype.expandChart = function(e) {
    return alert('Eventually show the full chart');
  };
  BalanceChart.prototype.render = function() {
    var chart, fontStyle, lineColor, maxBalance, minBalance, series, tickInterval;
    maxBalance = _.max(this.balances, function(balance) {
      return balance[1];
    });
    minBalance = _.min(this.balances, function(balance) {
      return balance[1];
    });
    maxBalance = maxBalance != null ? maxBalance[1] : void 0;
    minBalance = minBalance != null ? minBalance[1] : void 0;
    tickInterval = 0;
    if (maxBalance < 1000) {
      maxBalance = this.toNext(maxBalance, 100);
      minBalance = this.toPrev(minBalance, 100);
    } else if (maxBalance > 100000) {
      maxBalance = this.toNext(maxBalance, 1000000);
      minBalance = this.toPrev(maxBalance, 1000000);
    } else {
      maxBalance = this.toNext(maxBalance, 1000);
      minBalance = this.toPrev(minBalance, 1000);
    }
    tickInterval = (maxBalance - minBalance) / 4;
    lineColor = "#f3f3f3";
    fontStyle = {
      fontSize: '9px',
      color: '#999'
    };
    series = {
      data: this.balances
    };
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'balance-chart',
        width: 150,
        height: 75,
        type: 'area',
        alignTicks: false,
        borderWidth: 0,
        borderRadius: 0,
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 0,
        marginRight: 1,
        events: {
          click: this.expandChart
        },
        style: {
          cursor: "pointer"
        }
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: null
        },
        dateTimeLabelFormats: {
          day: '%b %e'
        },
        gridLineColor: lineColor,
        minorGridLineColor: lineColor,
        tickInterval: 24 * 3600 * 1000,
        gridLineWidth: 1,
        showFirstLabel: false,
        tickPosition: 'inside',
        labels: {
          y: -4,
          x: -14,
          step: 2,
          style: fontStyle
        }
      },
      yAxis: {
        gridLineColor: "#ddd",
        tickWidth: 0,
        minorTickWidth: 0,
        minorGridLineColor: lineColor,
        title: {
          text: false
        },
        showFirstLabel: false,
        startOnTick: false,
        minorTickInterval: tickInterval,
        tickInterval: tickInterval * 2,
        max: maxBalance,
        min: minBalance,
        labels: {
          style: fontStyle,
          y: 12,
          x: 35,
          formatter: function() {
            var ret, value;
            ret = null;
            value = this.value;
            if ((tickInterval % 1000000) === 0) {
              ret = (value / 1000000) + 'M';
            } else if ((tickInterval % 1000) === 0) {
              ret = (value / 1000) + 'k';
            } else {
              ret = Highcharts.numberFormat(value, 0, ',');
            }
            return '$' + ret;
          }
        }
      },
      series: [series],
      legend: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return '$' + Highcharts.numberFormat(this.y, 0, ',');
        },
        style: {
          fontSize: '11px',
          padding: "5px 10px"
        },
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#4497cd"
      },
      plotOptions: {
        area: {
          fillColor: 'rgba(68, 151, 205, 0.05)',
          animation: 5000,
          lineWidth: 1,
          lineColor: 'rgba(68, 151, 205, 0.7)',
          shadow: false,
          events: {
            click: this.expandChart
          },
          states: {
            hover: {
              enabled: true,
              marker: {
                lineWidth: 1,
                lineColor: 'rgba(68, 151, 205, 1)'
              }
            }
          },
          marker: {
            lineColor: 'rgba(68, 151, 205, 1)',
            radius: 1.4,
            states: {
              hover: {
                enabled: true,
                radius: 2.4
              }
            }
          }
        }
      }
    });
    return this;
  };
  return BalanceChart;
})();