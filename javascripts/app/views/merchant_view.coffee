define ["lib/jquery-ui"], ->
  class MerchantView extends Backbone.View

    el: $('#merchant-view')

    events:
      "click .close": "close"

    initialize: (items) ->

      items.bind 'change:selected', @changeSelected

      this.$('.close').button
        icons:
          primary: 'ui-icon-close'

    changeSelected: (item) =>
      if item.get('selected')
        this.loadContent item
        @currentItem = item
        $(@el).show()
      else
        $(@el).find('.content').html('').end().hide()

    close: =>
      @currentItem.set 'selected': false

    loadContent: (item) =>
      $(@el).find('.content').html('<h3>' + item.get('name') + '<h3>')
