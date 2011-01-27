var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/events/cu_event'], function(CUEvent) {
  var BranchEvent;
  return BranchEvent = (function() {
    function BranchEvent() {
      this.feedbackQuestion = __bind(this.feedbackQuestion, this);;      BranchEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(BranchEvent, CUEvent);
    BranchEvent.prototype.initialize = function() {
      BranchEvent.__super__.initialize.call(this);
      this.updateFields.push('teller_comment', 'teller_rating');
      this.description = "In-Person " + (this.depositOrWithdrawal());
      this.meta = "" + (this.get('branch').name) + " Branch";
      return this.nameAndAddress = "<h2>Vantage Credit Union</h2><h3>" + (this.get('branch').name) + " Branch</h3><p>" + (this.get('branch')['address_summary']) + "</p>";
    };
    BranchEvent.prototype.feedbackQuestion = function() {
      return "" + (this.get('teller').first_name) + " served as your teller for this " + (this.depositOrWithdrawal().toLowerCase()) + ". <br /><strong>How was his service?</strong>";
    };
    BranchEvent.prototype.toDetailJSON = function() {
      var detailJSON;
      detailJSON = BranchEvent.__super__.toDetailJSON.call(this);
      return _.extend(detailJSON, {
        address: this.nameAndAddress
      });
    };
    return BranchEvent;
  })();
});