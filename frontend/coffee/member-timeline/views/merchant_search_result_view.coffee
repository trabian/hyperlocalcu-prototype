define ['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=2'], (handlebars, template) ->

  class MerchantSearchResultView extends Backbone.View

    tagName: 'div'

    className: 'result'

    events:
      'click button.select': 'select'

    template: Handlebars.compile(template)

    render: =>

      result = @options.result

      console.log result.html

      context =
        title: result.titleNoFormatting
        address: result.addressLines.join('<br />')

      $(@el).html @template(context)

      return this
