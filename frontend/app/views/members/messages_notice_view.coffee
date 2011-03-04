class App.view.MessagesNotice extends Backbone.View

  id: 'messages-notice'

  initialize: (options) ->

    @template = App.templates['members/messages_notice']

  render: ->

    $(@el).html @template()

    this
