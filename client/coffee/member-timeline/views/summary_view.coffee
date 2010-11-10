# In Progress: This is the summary view in the right sidebar
define ["vendor/jquery-ui"], ->
  class SummaryView extends Backbone.View

    el: $('#rewards-summary')

    initialize: ->
      this.$('.timeframe span').button
        icons:
          primary: 'ui-icon-calendar'
          secondary: "ui-icon-triangle-1-s"
