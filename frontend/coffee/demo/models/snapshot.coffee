define ->

  class Snapshot extends Backbone.Model

    age: ->
      new Date() - new Date(this.get('timestamp'))

    restore: ->
      $.post "#{this.url()}/restore", =>
        this.trigger 'restore'
