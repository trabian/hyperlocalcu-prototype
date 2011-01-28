var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/merchants/search_with_options.handlebars?v=2', 'app/views/merchants/search_result_view', "vendor/jquery-mousewheel", "vendor/jquery-jscrollpane"], function(template_with_options, MerchantSearchResultView) {
  var MerchantSearchView;
  return MerchantSearchView = (function() {
    function MerchantSearchView() {
      this.displaySearchResults = __bind(this.displaySearchResults, this);;
      this.searchGoogle = __bind(this.searchGoogle, this);;
      this.search = __bind(this.search, this);;
      this.searchOnEnter = __bind(this.searchOnEnter, this);;      MerchantSearchView.__super__.constructor.apply(this, arguments);
    }
    __extends(MerchantSearchView, Backbone.View);
    MerchantSearchView.prototype.id = 'merchant-search';
    MerchantSearchView.prototype.events = {
      'click button.search': 'search',
      'keypress input.search-field': 'searchOnEnter',
      'click li': 'chooseLocation'
    };
    MerchantSearchView.prototype.templateWithOptions = Handlebars.compile(template_with_options);
    MerchantSearchView.prototype.initialize = function(options) {
      return this.defaultSearch = "" + (this.model.get('name')) + " in " + (this.model.member.cityState());
    };
    MerchantSearchView.prototype.render = function() {
      $(this.el).html(this.templateWithOptions({
        defaultSearch: this.defaultSearch
      }));
      this.resultsDiv = this.$('.search-results');
      this.resultsList = this.resultsDiv.find('ul');
      this.resultsDiv.jScrollPane();
      this.resultsScroll = this.resultsDiv.data('jsp');
      this.$('button').button({
        icons: {
          primary: 'ui-icon-search'
        }
      });
      this.search();
      return this;
    };
    MerchantSearchView.prototype.searchOnEnter = function(e) {
      if (e.keyCode === 13) {
        return this.search();
      }
    };
    MerchantSearchView.prototype.search = function() {
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
    MerchantSearchView.prototype.searchGoogle = function(query) {
      return this.localSearch.execute(query);
    };
    MerchantSearchView.prototype.displaySearchResults = function() {
      var resultCount;
      this.resultsDiv.find('ul').empty();
      if (_.any(this.localSearch.results)) {
        resultCount = this.localSearch.results.length;
        if (resultCount === 0) {} else {
          _.each(this.localSearch.results, __bind(function(result) {
            var resultView;
            resultView = new MerchantSearchResultView({
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
        }
      }
      this.resultsScroll.reinitialise();
      return this.$('button.search').button('enable');
    };
    return MerchantSearchView;
  })();
});