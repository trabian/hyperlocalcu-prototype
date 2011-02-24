class App.view.SubaccountList extends Backbone.View

  initialize: (options) ->
    @template = App.templates['members/subaccount_list']

  render: =>

    $(@el).html @template(@options)

    this.renderSubaccounts()

    return this

  renderSubaccounts: =>

    subaccountList = this.$('.subaccounts')

    _.each @options.subaccounts, (subaccount) =>

      subaccount.set('accountNumber': @model.get('number'))

      subaccountView = new App.view.Subaccount
        model: subaccount

      subaccountList.append subaccountView.render().el
