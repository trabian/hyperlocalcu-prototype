define ['vendor/handlebars', 'vendor/jquery-timeago', 'text!views/demo/snapshot.handlebars?v=6'], (handlebars, timeago, template) ->

  class SnapshotView extends Backbone.View

    events:
      "click .delete": "destroy"
      "click .restore": "restore"

    tagName: 'li'

    className: 'snapshot'

    template: Handlebars.compile(template)

    initialize: ->
      @model.bind 'change', @render
      @model.bind 'restore', ->
        window.location.hash = '#'
        window.location.reload()

    render: ->

      $(@el).html @template(@model.toJSON())

      this.$('.timestamp').text $.timeago(@model.get('timestamp'))

      this.$('.restore').button
        icons:
          primary: 'ui-icon-check'

      this.$('.delete').button
        icons:
          primary: 'ui-icon-close'

      return this

    destroy: =>
      if confirm "Are you sure you want to remove this snapshot?"
        @model.destroy()
        this.remove()

    restore: =>
      if confirm "Are you sure you want to restore this snapshot?"
        @model.restore()
