define ["app/views/history_view", "app/models/item_list"], (HistoryView, Items) ->

  history_view = new HistoryView

  Items.fetch()
