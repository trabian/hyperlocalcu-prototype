define ['vendor/handlebars', 'text!views/member-timeline/merchant_search_result.handlebars?v=3'], (handlebars, template) ->

  class MerchantSearchResultView extends Backbone.View

    tagName: 'li'

    className: 'result'

    events:
      'click button': 'select'

    template: Handlebars.compile(template)

    select: =>

      alert "(This will soon create a merchant and associate it with this item.  For now, we'll change the name in the transaction list)"

      @model.save('name': @options.result.titleNoFormatting)

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
