var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'member-timeline/views/merchant_search_result_view', 'text!views/member-timeline/merchant_search.handlebars?v=5'], function(handlebars, MerchantSearchResultView, template) {
  var MerchantSearchView;
  MerchantSearchView = function() {
    var _a;
    _a = this;
    this.searchGoogle = function(){ return MerchantSearchView.prototype.searchGoogle.apply(_a, arguments); };
    this.displaySearchResults = function(){ return MerchantSearchView.prototype.displaySearchResults.apply(_a, arguments); };
    this.search = function(){ return MerchantSearchView.prototype.search.apply(_a, arguments); };
    this.searchOnEnter = function(){ return MerchantSearchView.prototype.searchOnEnter.apply(_a, arguments); };
    this.hidePrompt = function(){ return MerchantSearchView.prototype.hidePrompt.apply(_a, arguments); };
    this.render = function(){ return MerchantSearchView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantSearchView, Backbone.View);
  MerchantSearchView.prototype.tagName = 'div';
  MerchantSearchView.prototype.className = 'merchant-search';
  MerchantSearchView.prototype.events = {
    'click button.search': 'search',
    'keypress input.search-field': 'searchOnEnter',
    'click a.hide-message': 'hidePrompt'
  };
  MerchantSearchView.prototype.template = Handlebars.compile(template);
  MerchantSearchView.prototype.render = function() {
    var _a, context;
    context = _.extend(this.model.toJSON(), {
      defaultSearch: ("" + (this.model.get('name')) + " in " + (this.model.member.cityState()))
    });
    $(this.el).html(this.template(context));
    this.$('button').button({
      icons: {
        primary: 'ui-icon-search'
      }
    });
    if (!(typeof (_a = this.model.member.hideMemberSidebarPrompt) !== "undefined" && _a !== null)) {
      this.$('.prompt').show();
    }
    return this;
  };
  MerchantSearchView.prototype.hidePrompt = function() {
    this.model.member.hideMemberSidebarPrompt = true;
    this.$('.prompt').hide();
    alert("For now, this prompt will be shown again when you refresh the page -- we're not storing the preference in the database yet.");
    return false;
  };
  MerchantSearchView.prototype.searchOnEnter = function(e) {
    if (e.keyCode === 13) {
      return this.search();
    }
  };
  MerchantSearchView.prototype.search = function() {
    var _a, query;
    query = this.$('.search-field').val();
    this.$('.prompt').hide();
    this.$('button.search').button('option', 'label', 'Searching...').button('disable');
    return (typeof (_a = this.localSearch) !== "undefined" && _a !== null) ? this.searchGoogle(query) : google.load('search', '1', {
      callback: __bind(function() {
        this.localSearch = new google.search.LocalSearch();
        this.localSearch.setCenterPoint(this.model.member.cityState());
        this.localSearch.setResultSetSize(5);
        this.localSearch.setSearchCompleteCallback(this, this.displaySearchResults, null);
        return this.searchGoogle(query);
      }, this)
    });
  };
  MerchantSearchView.prototype.displaySearchResults = function() {
    var resultsDiv, resultsList;
    $('.merchant-search-results').remove();
    if (_.any(this.localSearch.results)) {
      resultsDiv = this.make('div', {
        className: 'merchant-search-results'
      });
      resultsList = this.make('ul');
      _.each(this.localSearch.results, __bind(function(result) {
        var resultView;
        resultView = new MerchantSearchResultView({
          model: this.model,
          result: result
        });
        return $(resultsList).append(resultView.render().el);
      }, this));
      $(resultsDiv).append(resultsList);
      $(this.el).append(resultsDiv);
    }
    return this.$('button.search').button('option', 'label', 'Search').button('enable');
  };
  MerchantSearchView.prototype.searchGoogle = function(query) {
    return this.localSearch.execute(query);
  };
  return MerchantSearchView;
});