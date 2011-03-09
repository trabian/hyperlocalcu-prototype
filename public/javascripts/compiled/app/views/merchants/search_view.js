var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MerchantSearch = (function() {
  function MerchantSearch() {
    this.displaySearchResults = __bind(this.displaySearchResults, this);;
    this.searchGoogle = __bind(this.searchGoogle, this);;
    this.search = __bind(this.search, this);;
    this.searchOnEnter = __bind(this.searchOnEnter, this);;    MerchantSearch.__super__.constructor.apply(this, arguments);
  }
  __extends(MerchantSearch, Backbone.View);
  MerchantSearch.prototype.id = 'merchant-search';
  MerchantSearch.prototype.events = {
    'click button.search': 'search',
    'keypress input.search-field': 'searchOnEnter',
    'click li': 'chooseLocation'
  };
  MerchantSearch.prototype.templatePath = 'merchants/search_with_options';
  MerchantSearch.prototype.initialize = function(options) {
    return this.defaultSearch = this.model.get('name') != null ? "" + (this.model.get('name')) + " in " + (this.model.member.cityState()) : null;
  };
  MerchantSearch.prototype.render = function() {
    $(this.el).html(App.templates[this.templatePath]({
      defaultSearch: this.defaultSearch,
      searchPrompt: this.options.searchPrompt
    }));
    this.$('a.search').button({
      icons: {
        primary: 'ui-icon-search'
      }
    });
    this.resultsDiv = this.$('.search-results');
    this.resultsList = this.resultsDiv.find('ul');
    this.resultsDiv.jScrollPane();
    this.resultsScroll = this.resultsDiv.data('jsp');
    if (this.model.get('name') != null) {
      this.search();
    } else {
      this.resultsDiv.hide();
    }
    return this;
  };
  MerchantSearch.prototype.searchOnEnter = function(e) {
    if (e.keyCode === 13) {
      return this.search();
    }
  };
  MerchantSearch.prototype.search = function() {
    var query;
    query = this.$('.search-field').val();
    this.$('.prompt').hide();
    this.$('button.search').button('disable');
    if (this.localSearch != null) {
      return this.searchGoogle(query);
    } else {
      return google.load('search', '1', {
        callback: __bind(function() {
          this.localSearch = new google.search.LocalSearch();
          this.localSearch.setCenterPoint(this.model.member.cityState());
          this.localSearch.setResultSetSize(10);
          this.localSearch.setSearchCompleteCallback(this, this.displaySearchResults, null);
          return this.searchGoogle(query);
        }, this)
      });
    }
  };
  MerchantSearch.prototype.searchGoogle = function(query) {
    return this.localSearch.execute(query);
  };
  MerchantSearch.prototype.displaySearchResults = function() {
    var resultCount;
    this.resultsDiv.find('ul').empty();
    if (_.any(this.localSearch.results)) {
      this.$('.search-summary').text('However, we found the following possibilities using Google Local. Does one of these options look correct?');
      resultCount = this.localSearch.results.length;
      $(this.el).addClass('results-available');
      this.resultsDiv.show();
      _.each(this.localSearch.results, __bind(function(result) {
        var resultView;
        resultView = new App.view.MerchantSearchResult({
          model: this.model,
          result: result
        });
        return this.resultsList.append(resultView.render().el);
      }, this));
      if (resultCount === 1) {
        $(this.resultsDiv).height('70px');
        this.resultsList.height('68px');
      } else if (resultCount === 2) {
        $(this.resultsDiv).height('140px');
        this.resultsList.height('auto');
        $(this.resultsDiv).find('ul').height('auto');
      } else {
        $(this.resultsDiv).height('210px');
        this.resultsList.height('auto');
      }
    } else {
      this.$('.search-summary').text('You can expand the search results using the form below.');
      $(this.el).removeClass('results-available');
    }
    this.resultsScroll.reinitialise();
    return this.$('button.search').button('enable');
  };
  return MerchantSearch;
})();