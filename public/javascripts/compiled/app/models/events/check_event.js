var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
App.model.CheckEvent = (function() {
  function CheckEvent() {
    CheckEvent.__super__.constructor.apply(this, arguments);
  }
  __extends(CheckEvent, App.model.MerchantEvent);
  CheckEvent.prototype.initialize = function() {
    var check_name;
    CheckEvent.__super__.initialize.call(this);
    check_name = "Check #" + (this.get('check_number'));
    if (this.merchant != null) {
      this.meta = check_name;
    } else {
      this.description = check_name;
    }
    this.updateFields.push('check_image_comment');
    return this.bind('change:merchant', __bind(function() {
      return this.meta = check_name;
    }, this));
  };
  CheckEvent.prototype.toDetailJSON = function() {
    var detailJSON;
    detailJSON = CheckEvent.__super__.toDetailJSON.call(this);
    return _.extend(detailJSON, {
      description: "Check #" + this.id
    });
  };
  return CheckEvent;
})();
App.model.EventFactory.check = App.model.CheckEvent;