# http://code.google.com/apis/maps/documentation/localsearch/devguide.html#execute_a_search_and_display_results
define ['vendor/handlebars', 'member-timeline/views/merchant_search_result_view', 'text!views/member-timeline/merchant_search.handlebars?v=2'], (handlebars, MerchantSearchResultView, template) ->

  class MerchantSearchView extends Backbone.View

    tagName: 'div'

    className: 'merchant-search'

    events:
      'click button.search': 'search'

    template: Handlebars.compile(template)

    render: =>

      context = _.extend @model.toJSON(),
        defaultSearch: "#{@model.get('name')} in #{@model.member.cityState()}"

      $(@el).html @template(context)

      this.$('button').button
        icons:
          primary: 'ui-icon-search'

      return this

    search: =>

      query = this.$('.search-field').val()

      if @localSearch?
        this.searchGoogle(query)
      else
        google.load 'search', '1', callback: =>
          @localSearch = new google.search.LocalSearch()
          @localSearch.setCenterPoint(@model.member.cityState())
          @localSearch.setSearchCompleteCallback(this, @displaySearchResults, null)
          this.searchGoogle(query)

    displaySearchResults: =>

      resultDiv = this.$('.merchant-search-results')

      resultDiv.empty()

      _.each @localSearch.results, (result) =>
        resultView = new MerchantSearchResultView
          model: @model
          result: result

        resultDiv.append resultView.render().el

    searchGoogle: (query) =>
      @localSearch.execute(query)
