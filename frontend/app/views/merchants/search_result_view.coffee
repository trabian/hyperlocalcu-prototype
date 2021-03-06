#define ['text!views/merchants/search_result.handlebars?v=1', 'app/models/merchant_list', 'vendor/handlebars'], (template, MerchantList) ->

class App.view.MerchantSearchResult extends Backbone.View

  tagName: 'li'

  className: 'result'

  events:
    'click': 'select'

  templatePath: 'merchants/search_result'

  select: =>

    result = @options.result

    params =
      name: result.titleNoFormatting
      street1: result.streetAddress
      city: result.city
      region: result.region
      address_summary: result.addressLines.join("<br />")

    try
      params.full_result = JSON.stringify(result)
    catch error
      #Nothing

    @model.addMerchant params

    return false

  render: =>

    result = @options.result

    context =
      title: result.titleNoFormatting
      address: result.addressLines.join('<br />')

    $(@el).html App.templates[@templatePath](context)

    return this

