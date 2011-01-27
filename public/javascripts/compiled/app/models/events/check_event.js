var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/events/merchant_event'], function(MerchantEvent) {
  var CheckEvent;
  return CheckEvent = (function() {
    function CheckEvent() {
      CheckEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(CheckEvent, MerchantEvent);
    CheckEvent.prototype.initialize = function() {
      var check_name;
      CheckEvent.__super__.initialize.call(this);
      check_name = "Check #" + (this.get('check_number'));
      if (this.merchant != null) {
        this.meta = check_name;
      } else {
        this.description = check_name;
      }
      return this.updateFields.push('check_image_comment');
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
});