# The Demo Controller is the main controller for handling demo-specific tasks
define ["order!vendor/socket_io", "order!vendor/juggernaut", "demo/views/snapshot_dialog_view"], (socket_io, juggernaut, SnapshotDialogView) ->

  class DemoController extends Backbone.Controller

    initialize: (options) ->

      jug = new Juggernaut()
      jug.subscribe 'monitor', (data) ->
        console.log 'Message received on "monitor" channel', data

    # ##Routes and Actions

    # ###Routes
    routes:
      "demo/snapshots": 'fetchSnapshots'

    # ###Actions
    fetchSnapshots: =>
      @snapshotDialogView or= new SnapshotDialogView
      @snapshotDialogView.render()
