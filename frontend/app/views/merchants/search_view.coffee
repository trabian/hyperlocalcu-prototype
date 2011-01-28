define ['text!views/merchants/search_with_options.handlebars?v=2'], (template_with_options) ->

  class MerchantSearchView extends Backbone.View

    id: 'merchant-search'

    templateWithOptions: Handlebars.compile(template_with_options)

    initialize: (options) ->

      @defaultSearch = "#{@model.get('name')} in #{@model.member.cityState()}"

      alert @defaultSearch

    render: ->

      $(@el).html @templateWithOptions()

      return this
