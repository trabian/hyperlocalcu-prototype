define ['demo/models/snapshot'], (Snapshot) ->

  class SnapshotList extends Backbone.Collection

    model: Snapshot

    url: '/demo/snapshots'

    comparator: (snapshot) ->
      snapshot.age()
