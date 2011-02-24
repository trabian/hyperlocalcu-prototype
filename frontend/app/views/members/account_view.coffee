class App.view.Account extends Backbone.View

  id: 'accounts'

  initialize: (options) ->
    @template = App.templates['members/account']

    @collection.bind 'change:selected', @render

  render: =>

    @model = @collection.current()

    $(@el).html @template
      current: @model.toJSON()

    this.addSubaccounts @model.shares, 'share-accounts', 'Share Accounts'

    this.addSubaccounts @model.loans, 'loan-accounts', 'Loan Accounts'

    return this

  addSubaccounts: (collection, className, title) ->

    unless collection.isEmpty()

      listView = new App.view.SubaccountList
        model: @model
        className: className
        title: title
        collection: collection

      $(@el).append listView.render().el
