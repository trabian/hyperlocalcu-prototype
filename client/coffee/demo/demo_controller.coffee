# The Demo Controller is the main controller for handling demo-specific tasks
define ["demo/views/snapshot_dialog_view"], (SnapshotDialogView) ->

  class DemoController extends Backbone.Controller

    # ##Routes and Actions

    # ###Routes
    routes:
      "demo/snapshots": 'fetchSnapshots'

    # ###Actions
    fetchSnapshots: =>
      @snapshotDialogView or= new SnapshotDialogView
      @snapshotDialogView.render()
