define ['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=4'], (handlebars, template) ->

  class MerchantSearchResultView extends Backbone.View

    tagName: 'li'

    className: 'result'

    events:
      'click button': 'select'

    template: Handlebars.compile(template)

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
