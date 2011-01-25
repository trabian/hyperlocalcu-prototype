var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/lib/models/custom_sync', 'app/models/event'], function(CustomSync, Event) {
  var Feedback;
  return Feedback = (function() {
    function Feedback() {
      this.toUpdateJSON = __bind(this.toUpdateJSON, this);;      Feedback.__super__.constructor.apply(this, arguments);
    }
    __extends(Feedback, Backbone.Model);
    Feedback.prototype.initialize = function() {
      return this.sync = CustomSync;
    };
    Feedback.prototype.toUpdateJSON = function() {
      return {
        subject: {
          key: this.get('subject_key'),
          id: this.subject.id
        },
        feedback: {
          rating: this.get('rating'),
          comment: this.get('comment')
        }
      };
    };
    return Feedback;
  })();
});