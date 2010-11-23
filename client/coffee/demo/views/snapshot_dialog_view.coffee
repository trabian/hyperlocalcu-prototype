define ['vendor/handlebars', 'demo/views/snapshot_view', 'demo/models/snapshot_list', 'text!views/demo/snapshot_dialog.handlebars?v=10'], (handlebars, SnapshotView, SnapshotList, template) ->

  class SnapshotDialogView extends Backbone.View

    id: 'snapshot-dialog'

    events:
      "keypress input.text": "updateOnEnter"
      "keyup input.text": "updateForm"
      "click .form button": "submitForm"

    template: Handlebars.compile(template)

    render: =>

      $(@el).html @template()

      $(@el).dialog
        title: "Snapshots"
        width: 460
        height: 400
        open: @open
        close: @close

    close: (event, ui) =>
      this.remove()
      window.location.hash = '#'

    open: (event, ui) =>

      @snapshots = new SnapshotList

      @snapshots.bind 'refresh', @addAll

      @snapshots.fetch()

      this.delegateEvents()
      
      this.$('.form button').button
        disabled: true

    addOne: (snapshot, bottom) =>

      bottom = false if bottom == null

      view = new SnapshotView
        model: snapshot
        collection: @snapshots

      list = this.$('.snapshot-list')
      snapshot = view.render().el

      if (bottom)
        list.append snapshot
      else
        list.prepend snapshot
      
    addAll: =>
      this.$('.snapshot-list').empty()
      @snapshots.each @addOne

    updateForm: =>

      @field or= this.$('input.name')
      @button or= this.$('.form button')

      name = $.trim(@field.val())

      if name.length > 0
        @button.button('enable')
      else
        @button.button('disable')

    updateOnEnter: (e)=>

      if e.keyCode == 13
        this.submitForm()

    submitForm: =>

      name = $.trim(this.$('input.name').val())

      if name.length > 0
        @snapshots.create "name": this.$('input.name').val()
        @snapshots.fetch()
