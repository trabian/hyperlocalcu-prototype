class App.view.Account extends Backbone.View

  id: 'accounts'

  initialize: (options) ->
    @template = App.templates['members/account']

    @collection.bind 'change:selected', @render

  render: =>

    @model = @collection.current()

    $(@el).html @template
      current: @model.toJSON()

    unless _.isEmpty @model.shares
      sharesView = new App.view.SubaccountList
        model: @model
        className: 'share-accounts'
        title: "Share Accounts"
        subaccounts: @model.shares

      $(@el).append sharesView.render().el

    unless _.isEmpty @model.loans
      loansView = new App.view.SubaccountList
        model: @model
        className: 'loan-accounts'
        title: "Loan Accounts"
        subaccounts: @model.loans

      $(@el).append loansView.render().el

    return this
