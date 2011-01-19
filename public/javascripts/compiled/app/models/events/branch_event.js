var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/events/cu_event'], function(CUEvent) {
  var BranchEvent;
  BranchEvent = function() {
    var _a;
    _a = this;
    this.feedbackQuestion = function(){ return BranchEvent.prototype.feedbackQuestion.apply(_a, arguments); };
    return CUEvent.apply(this, arguments);
  };
  __extends(BranchEvent, CUEvent);
  BranchEvent.prototype.initialize = function() {
    BranchEvent.__super__.initialize.call(this);
    this.updateFields.push('teller_comment', 'teller_rating');
    this.description = ("In-Person " + (this.depositOrWithdrawal()));
    return (this.meta = ("" + (this.get('branch').name) + " Branch"));
  };
  BranchEvent.prototype.feedbackQuestion = function() {
    return "" + (this.get('teller').first_name) + " served as your teller for this " + (this.depositOrWithdrawal().toLowerCase()) + ". <br /><strong>How was his service?</strong>";
  };
  BranchEvent.prototype.toDetailJSON = function() {
    var detailJSON;
    detailJSON = BranchEvent.__super__.toDetailJSON.call(this);
    return _.extend(detailJSON, {
      address: this.get('branch')['address_summary']
    });
  };
  return BranchEvent;
});