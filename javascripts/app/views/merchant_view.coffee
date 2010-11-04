define ["lib/jquery-ui"], ->

  # The MerchantView is used to show merchant-specific information
  # such as the current offer.
  class MerchantView extends Backbone.View

    # This element will be hidden by default
    el: $('#merchant-view')

    # Bind to DOM events within the view
    events:
      "click .close": "close"

    initialize: (items) ->

      # Listen for the selection or deselection of items
      items.bind 'change:selected', @changeSelected

      # Convert the .close link into a jQuery UI button
      this.$('.close').button
        icons:
          primary: 'ui-icon-close'

      # Mix in the Events module for custom event support
      _.extend this, Backbone.Events

    # Change the view based on which item is selected.
    # If no item is selected, then clear and hide the view.
    changeSelected: (item) =>

      if item.get('selected')

        @currentItem = item

        this.loadContent item

        $(@el).show()

        this.trigger 'show'

      else
        this.$('.content').empty()
        $(@el).hide()
        this.trigger 'hide'

    # Unselect the item, thus triggering the changeSelected and hiding the view
    close: =>
      @currentItem.set 'selected': false

    # This will eventually pull content via AJAX
    loadContent: (item) =>
      this.$('.content').html('<h3>' + item.get('name') + '<h3>')
