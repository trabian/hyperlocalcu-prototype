class App.view.LoginStatus extends Backbone.View

  id: 'login-status'

  initialize: (options) ->

    @template = App.templates['members/login_status']

  render: ->

    $(@el).html @template(@model.toViewJSON())

    this

