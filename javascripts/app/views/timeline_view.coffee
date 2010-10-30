define ['app/models/item_list', 'app/views/item_view', 'app/views/summary_view'], (Items, ItemView, SummaryView) ->

  class TimelineView extends Backbone.View

    el: $('#timeline tbody')

    initialize: ->

      summary_view = new SummaryView

      _.bindAll this, 'addAll'

      Items.bind 'refresh', this.addAll

    addOne: (item) ->

      view = new ItemView { model: item }

      #TODO: This doesn't look right
      this.$('#timeline').append view.render().el

      $(view.el).addClass('repeat-date') if item.get('timestamp') is this.lastTimestamp

      this.lastTimestamp = item.get('timestamp')

    addAll: ->
      Items.each this.addOne
