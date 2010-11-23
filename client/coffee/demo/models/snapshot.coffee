define ->

  class Snapshot extends Backbone.Model

    restore: ->
      $.post "#{this.url()}/restore", =>
        this.trigger 'restore'
