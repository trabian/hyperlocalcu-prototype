class App.view.SubaccountList extends Backbone.View

  initialize: (options) ->

    @template = App.templates['accounts/subaccount_list']

    @collection.bind 'selectSubaccounts', (selected) =>
      $(@el).toggleClass 'selected', selected

  render: =>

    $(@el).html @template
      title: @options.title
      total: App.helper.currency.format(@collection.total())

    this.$('.offer').show() if @options.className == 'share-accounts' && @collection.total() > 4000

    this.renderSubaccounts()

    return this

  renderSubaccounts: =>

    subaccountList = this.$('.subaccounts')

    @collection.each (subaccount) =>

      subaccount.set('accountNumber': @model.get('number'))

      subaccountView = new App.view.Subaccount
        collection: @collection
        model: subaccount

      subaccountList.append subaccountView.render().el
