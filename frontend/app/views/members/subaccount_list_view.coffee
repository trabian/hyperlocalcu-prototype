class App.view.SubaccountList extends Backbone.View

  initialize: (options) ->
    @template = App.templates['members/subaccount_list']

  render: =>

    $(@el).html @template(@options)

    return this
