var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Feedback = (function() {
  function Feedback() {
    this.day = __bind(this.day, this);;
    this.formatted_service_timestamp = __bind(this.formatted_service_timestamp, this);;
    this.formatted_timestamp = __bind(this.formatted_timestamp, this);;
    this.formatDate = __bind(this.formatDate, this);;
    this.splitDate = __bind(this.splitDate, this);;
    this.toUpdateJSON = __bind(this.toUpdateJSON, this);;    Feedback.__super__.constructor.apply(this, arguments);
  }
  __extends(Feedback, Backbone.Model);
  Feedback.prototype.initialize = function() {
    return this.sync = App.model.CustomSync;
  };
  Feedback.prototype.toUpdateJSON = function() {
    return {
      subject: {
        key: this.get('subject_type'),
        id: this.subject.id
      },
      feedback: {
        rating: this.get('rating'),
        comment: this.get('comment')
      }
    };
  };
  Feedback.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      formatted_timestamp: this.formatted_timestamp,
      formatted_service_timestamp: this.formatted_service_timestamp
    });
  };
  Feedback.prototype.splitDate = function(date) {
    var time, _ref;
    _ref = date.split('T'), date = _ref[0], time = _ref[1];
    return date.split('-');
  };
  Feedback.prototype.formatDate = function(date) {
    var day, month, year, _ref;
    _ref = this.splitDate(date), year = _ref[0], month = _ref[1], day = _ref[2];
    return [month, day].join('/');
  };
  Feedback.prototype.formatted_timestamp = function() {
    return this.formatDate(this.get('created_at'));
  };
  Feedback.prototype.formatted_service_timestamp = function() {
    return this.formatDate(this.get('event_posted_at'));
  };
  Feedback.prototype.day = function() {
    var day, month, year, _ref;
    _ref = this.splitDate(this.get('created_at')), year = _ref[0], month = _ref[1], day = _ref[2];
    return [year, month, day].join('-');
  };
  return Feedback;
})();