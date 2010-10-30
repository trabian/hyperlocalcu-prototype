# Load [HistoryView](history_view.html) and [Items](item_list.html)
define ["app/views/history_view", "app/models/item_list"], (HistoryView, Items) ->

  # Instantiate the HistoryView
  new HistoryView

  # Fetch the items from the data store.  This will add all the items to the timeline.
  Items.fetch()
