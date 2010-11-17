# The Member Timeline Controller is the main controller for the member timeline
define ["member-timeline/views/timeline_view", "member-timeline/models/item_list", "member-timeline/views/merchant_view", "member-timeline/views/member_overview_view"], (TimelineView, ItemList, MerchantView, MemberOverviewView) ->

  class MemberTimelineController extends Backbone.Controller

    initialize: (options) ->

      # Setup item list, timeline, and member overview
      this.setupItemList()
      this.setupTimelineView()
      this.setupMemberOverviewView options.member

      # Optionally fetch as the final step of initialization
      this.fetch() if options.fetchOnInit == true

    # ## Connect item list and views

    # Setup the [item list](item_list.html)
    setupItemList: =>

      @items = new ItemList

      @items.bind 'change:selected', @changeSelected

      # If we explicitly unselect an item, make sure to set the current
      # location to '#' so a browser refresh doesn't restore the selection.
      @items.bind 'unselect', =>
        this.saveLocation ''

    setupTimelineView: =>
      @timelineView = new TimelineView(@items)

    setupMemberOverviewView: (member) =>
      @memberOverviewView = new MemberOverviewView
        el: $('#overview')
        model: member

    # ##Routes and Actions

    # ###Routes
    routes:
      "items/:itemId": 'selectItem'

    # ###Actions
    selectItem: (itemId) =>
      @items.selectOne @items.get(itemId)

    # ## Helpers

    # Fetch the items
    fetch: ->
      @items.fetch
        success: ->

          # Hide the 'loading' message and show the timeline
          $('#timeline-loading').hide()
          $('#timeline').show()

          # Start listening for route changes. The items need to be loaded
          # first, so this is in the 'success' callback of the item fetch.
          Backbone.history.start()

    # Change the selected item and either show or hide the [Merchant View](merchant_view.html)
    # based on whether the item is selected.
    changeSelected: (item) =>

      if item.get('selected')
        this.saveLocation "items/#{item.id}"
        this.showItem item
      else
        @merchantView.hide()


    # Show the [Merchant View](merchant_view.html) using the currently selected item.
    showItem: (item) =>

      @merchantView = new MerchantView
        model: item
        el: $('#merchant-view')

      # If the merchant view is visible, then the [Member Overview View](member_overview_view.html)
      # should be hidden.
      @merchantView.bind 'show', @memberOverviewView.hide

      # Restore the member overview view when the merchant view is hidden.
      @merchantView.bind 'hide', @memberOverviewView.show

      # This is separate from the merchant view initialization because we need
      # to setup the events above before rendering.
      @merchantView.render()

