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
define(['vendor/handlebars', 'member-timeline/views/merchant_search_result_view', 'text!views/member-timeline/merchant_search.handlebars?v=2'], function(handlebars, MerchantSearchResultView, template) {
  var MerchantSearchView;
  MerchantSearchView = function() {
    var _a;
    _a = this;
    this.searchGoogle = function(){ return MerchantSearchView.prototype.searchGoogle.apply(_a, arguments); };
    this.displaySearchResults = function(){ return MerchantSearchView.prototype.displaySearchResults.apply(_a, arguments); };
    this.search = function(){ return MerchantSearchView.prototype.search.apply(_a, arguments); };
    this.render = function(){ return MerchantSearchView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(MerchantSearchView, Backbone.View);
  MerchantSearchView.prototype.tagName = 'div';
  MerchantSearchView.prototype.className = 'merchant-search';
  MerchantSearchView.prototype.events = {
    'click button.search': 'search'
  };
  MerchantSearchView.prototype.template = Handlebars.compile(template);
  MerchantSearchView.prototype.render = function() {
    var context;
    context = _.extend(this.model.toJSON(), {
      defaultSearch: ("" + (this.model.get('name')) + " in " + (this.model.member.cityState()))
    });
    $(this.el).html(this.template(context));
    this.$('button').button({
      icons: {
        primary: 'ui-icon-search'
      }
    });
    return this;
  };
  MerchantSearchView.prototype.search = function() {
    var _a, query;
    query = this.$('.search-field').val();
    return (typeof (_a = this.localSearch) !== "undefined" && _a !== null) ? this.searchGoogle(query) : google.load('search', '1', {
      callback: __bind(function() {
        this.localSearch = new google.search.LocalSearch();
        this.localSearch.setCenterPoint(this.model.member.cityState());
        this.localSearch.setSearchCompleteCallback(this, this.displaySearchResults, null);
        return this.searchGoogle(query);
      }, this)
    });
  };
  MerchantSearchView.prototype.displaySearchResults = function() {
    var resultDiv;
    resultDiv = this.$('.merchant-search-results');
    resultDiv.empty();
    return _.each(this.localSearch.results, __bind(function(result) {
      var resultView;
      resultView = new MerchantSearchResultView({
        model: this.model,
        result: result
      });
      return resultDiv.append(resultView.render().el);
    }, this));
  };
  MerchantSearchView.prototype.searchGoogle = function(query) {
    return this.localSearch.execute(query);
  };
  return MerchantSearchView;
});