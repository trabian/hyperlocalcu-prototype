define ['app/models/item_list', 'app/views/item_view'], (Items, ItemView) ->

  class HistoryView extends Backbone.View

    el: $('#history')

    initialize: ->

      _.bindAll this, 'addAll'

      Items.bind 'refresh', this.addAll

    addOne: (item) ->

      view = new ItemView { model: item }

      this.$('#history').append view.render().el

      $(view.el).addClass('repeat-date') if item.get('timestamp') is this.lastTimestamp

      this.lastTimestamp = item.get('timestamp')

    addAll: ->
      Items.each this.addOne
