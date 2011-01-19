var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/events/merchant_event'], function(MerchantEvent) {
  var CheckEvent;
  CheckEvent = function() {
    return MerchantEvent.apply(this, arguments);
  };
  __extends(CheckEvent, MerchantEvent);
  CheckEvent.prototype.initialize = function() {
    var _a, check_name;
    CheckEvent.__super__.initialize.call(this);
    check_name = ("Check #" + (this.get('check_number')));
    if (typeof (_a = this.merchant) !== "undefined" && _a !== null) {
      this.meta = check_name;
    } else {
      this.description = check_name;
    }
    return this.updateFields.push('check_image_comment');
  };
  return CheckEvent;
});