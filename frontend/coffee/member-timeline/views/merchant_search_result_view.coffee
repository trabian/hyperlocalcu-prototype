define ['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=3'], (handlebars, template) ->

  class MerchantSearchResultView extends Backbone.View

    tagName: 'li'

    className: 'result'

    events:
      'click button': 'select'

    template: Handlebars.compile(template)

    select: =>

      result = @options.result

      @model.addMerchant
        name: result.titleNoFormatting
        street1: result.streetAddress
        city: result.city
        region: result.region
        address_summary: result.addressLines.join("<br />")
        full_result: JSON.stringify(result)

    render: =>

      result = @options.result

      context =
        title: result.titleNoFormatting
        address: result.addressLines.join('<br />')

      $(@el).html @template(context)

      this.$('button').button
        icons:
          primary: 'ui-icon-check'

      return this
