# http://code.google.com/apis/maps/documentation/localsearch/devguide.html#execute_a_search_and_display_results
define ['vendor/handlebars', 'member-timeline/views/merchant_search_result_view', 'text!views/member-timeline/merchant_search.handlebars?v=5'], (handlebars, MerchantSearchResultView, template) ->

  class MerchantSearchView extends Backbone.View

    tagName: 'div'

    className: 'merchant-search'

    events:
      'click button.search': 'search'
      'keypress input.search-field': 'searchOnEnter'
      'click a.hide-message': 'hidePrompt'

    template: Handlebars.compile(template)

    render: =>

      context = _.extend @model.toJSON(),
        defaultSearch: "#{@model.get('name')} in #{@model.member.cityState()}"

      $(@el).html @template(context)

      this.$('button').button
        icons:
          primary: 'ui-icon-search'

      this.$('.prompt').show() unless @model.member.hideMemberSidebarPrompt?

      return this

    hidePrompt: =>
      @model.member.hideMemberSidebarPrompt = true
      this.$('.prompt').hide()
      alert "For now, this prompt will be shown again when you refresh the page -- we're not storing the preference in the database yet."
      return false

    searchOnEnter: (e)=>
      this.search() if e.keyCode == 13

    search: =>

      query = this.$('.search-field').val()

      this.$('.prompt').hide()

      this.$('button.search').button('option', 'label', 'Searching...').button('disable')

      if @localSearch?
        this.searchGoogle(query)
      else
        google.load 'search', '1', callback: =>
          @localSearch = new google.search.LocalSearch()
          @localSearch.setCenterPoint @model.member.cityState()
          @localSearch.setResultSetSize 5
          @localSearch.setSearchCompleteCallback this, @displaySearchResults, null
          this.searchGoogle query

    displaySearchResults: =>

      $('.merchant-search-results').remove()
  
      if _.any @localSearch.results

        resultsDiv = this.make('div', { className: 'merchant-search-results' })

        resultsList = this.make('ul')

        _.each @localSearch.results, (result) =>
          resultView = new MerchantSearchResultView
            model: @model
            result: result

          $(resultsList).append resultView.render().el

        $(resultsDiv).append resultsList

        $(@el).append resultsDiv

      this.$('button.search').button('option', 'label', 'Search').button('enable')

    searchGoogle: (query) =>
      @localSearch.execute(query)
