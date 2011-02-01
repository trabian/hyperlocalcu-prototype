var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __slice = Array.prototype.slice;
define(['text!views/timeline/events/row.handlebars?v=3', 'vendor/handlebars'], function(template) {
  var EventRowView;
  return EventRowView = (function() {
    function EventRowView() {
      this.onChange = __bind(this.onChange, this);;
      this.changeSelection = __bind(this.changeSelection, this);;      EventRowView.__super__.constructor.apply(this, arguments);
    }
    __extends(EventRowView, Backbone.View);
    EventRowView.prototype.events = {
      click: "toggleSelectOne"
    };
    EventRowView.prototype.tagName = 'tr';
    EventRowView.prototype.className = 'withdrawal';
    EventRowView.prototype.template = Handlebars.compile(template);
    EventRowView.prototype.initialize = function() {
      this.model.bind('change:selected', this.changeSelection);
      this.model.bind('change', this.onChange);
      return this.render();
    };
    EventRowView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toViewJSON()));
      return this;
    };
    EventRowView.prototype.changeSelection = function() {
      return $(this.el).toggleClass('selected', this.model.get('selected'));
    };
    EventRowView.prototype.onChange = function() {
      var attributesToIgnore, changedKeys;
      attributesToIgnore = ['selected'];
      changedKeys = _.keys(this.model.changedAttributes());
      if (_.isEmpty(_.without.apply(_, [changedKeys].concat(__slice.call(attributesToIgnore))))) {
        return;
      }
      return this.render();
    };
    EventRowView.prototype.toggleSelectOne = function() {
      if (this.collection != null) {
        return this.collection.toggleOrSelectOne(this.model);
      } else {
        return this.model.toggleSelected();
      }
    };
    return EventRowView;
  })();
});