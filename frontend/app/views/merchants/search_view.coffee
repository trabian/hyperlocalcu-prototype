#define ['text!views/merchants/search_with_options.handlebars?v=5', 'app/views/merchants/search_result_view', "vendor/jquery-mousewheel", "vendor/jquery-jscrollpane"], (template_with_options, MerchantSearchResultView) ->

class App.view.MerchantSearch extends Backbone.View

  id: 'merchant-search'

  events:
    'click button.search': 'search'
    'keypress input.search-field': 'searchOnEnter'
    'click li': 'chooseLocation'

  templatePath: 'merchants/search_with_options'

  initialize: (options) ->

    @defaultSearch = if @model.get('name')? then "#{@model.get('name')} in #{@model.member.cityState()}" else null

  render: ->

    $(@el).html App.templates[@templatePath]
      defaultSearch: @defaultSearch
      searchPrompt: @options.searchPrompt

    this.$('a.search').button
      icons:
        primary: 'ui-icon-search'

    @resultsDiv = this.$('.search-results')
    @resultsList = @resultsDiv.find('ul')

    @resultsDiv.jScrollPane()

    @resultsScroll = @resultsDiv.data('jsp')

    if @model.get('name')?
      this.search()
    else
      @resultsDiv.hide()

    return this

  searchOnEnter: (e)=>
    this.search() if e.keyCode == 13

  search: =>

    query = this.$('.search-field').val()

    this.$('.prompt').hide()

    this.$('button.search').button('disable')

    if @localSearch?
      this.searchGoogle query
    else
      google.load 'search', '1', callback: =>
        @localSearch = new google.search.LocalSearch()
        @localSearch.setCenterPoint @model.member.cityState()
        @localSearch.setResultSetSize 10
        @localSearch.setSearchCompleteCallback this, @displaySearchResults, null
        this.searchGoogle query

  searchGoogle: (query) =>
    @localSearch.execute(query)

  displaySearchResults: =>

    @resultsDiv.find('ul').empty()

    if _.any @localSearch.results

      this.$('.search-summary').text 'However, we found the following possibilities using Google Local. Does one of these options look correct?'

      resultCount = @localSearch.results.length

      $(@el).addClass 'results-available'

      @resultsDiv.show()

      _.each @localSearch.results, (result) =>
        resultView = new App.view.MerchantSearchResult
          model: @model
          result: result

        @resultsList.append resultView.render().el

      if resultCount == 1
        $(@resultsDiv).height '70px'
        @resultsList.height '68px'
      else if resultCount == 2
        $(@resultsDiv).height '140px'
        @resultsList.height 'auto'
        $(@resultsDiv).find('ul').height 'auto'
      else
        $(@resultsDiv).height '210px'
        @resultsList.height 'auto'

    else

      this.$('.search-summary').text 'You can expand the search results using the form below.'

      $(@el).removeClass 'results-available'

    @resultsScroll.reinitialise()

    this.$('button.search').button('enable')
