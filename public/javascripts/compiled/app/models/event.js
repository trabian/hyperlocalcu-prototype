var TimelineEvent;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
TimelineEvent = (function() {
  function TimelineEvent() {
    this.trackEventActivity = __bind(this.trackEventActivity, this);;
    this.toUpdateJSON = __bind(this.toUpdateJSON, this);;
    this.className = __bind(this.className, this);;
    this.map = __bind(this.map, this);;
    this.meta = __bind(this.meta, this);;
    this.description = __bind(this.description, this);;
    this.formatted_amount = __bind(this.formatted_amount, this);;
    this.formatCurrency = __bind(this.formatCurrency, this);;
    this.day = __bind(this.day, this);;
    this.formatted_date = __bind(this.formatted_date, this);;
    this.formatted_timestamp = __bind(this.formatted_timestamp, this);;
    this.splitPostedAt = __bind(this.splitPostedAt, this);;
    this.initializeDetails = __bind(this.initializeDetails, this);;    TimelineEvent.__super__.constructor.apply(this, arguments);
  }
  __extends(TimelineEvent, Backbone.Model);
  TimelineEvent.prototype.initialize = function() {
    this.sync = CustomSync;
    this.member = window.member;
    this.updateFields = [];
    return this.bind('change', this.trackEventActivity);
  };
  TimelineEvent.prototype.initializeDetails = function() {
    this.feedbacks = new FeedbackList(this.get('feedbacks'), {
      event: this
    });
    return this.feedbacks.url = "/events/" + this.id + "/feedbacks";
  };
  TimelineEvent.prototype.splitPostedAt = function() {
    var date, time, _ref;
    _ref = this.get('posted_at').split('T'), date = _ref[0], time = _ref[1];
    return date.split('-');
  };
  TimelineEvent.prototype.formatted_timestamp = function() {
    var day, month, year, _ref;
    _ref = this.splitPostedAt(), year = _ref[0], month = _ref[1], day = _ref[2];
    return [month, day].join('/');
  };
  TimelineEvent.prototype.formatted_date = function() {
    return this.formatDate(this.get('posted_at'), 'DD, MM d, yy');
  };
  TimelineEvent.prototype.day = function() {
    var day, month, year, _ref;
    _ref = this.splitPostedAt(), year = _ref[0], month = _ref[1], day = _ref[2];
    return [year, month, day].join('-');
  };
  TimelineEvent.prototype.formatCurrency = function(amount) {
    var sign;
    sign = amount < 0 ? '<span class="sign">-</span>' : '';
    return "" + sign + "<span class='currency'>$</span>" + ($.currency(Math.abs(amount)));
  };
  TimelineEvent.prototype.formatDate = function(date, format) {
    format || (format = 'm/d/yy');
    return $.datepicker.formatDate(format, $.datepicker.parseDate('yy-m-d', date));
  };
  TimelineEvent.prototype.formatted_amount = function() {
    return this.formatCurrency(this.get('amount'));
  };
  TimelineEvent.prototype.depositOrWithdrawal = function() {
    if (this.isDeposit()) {
      return "Deposit";
    } else {
      return "Withdrawal";
    }
  };
  TimelineEvent.prototype.isDeposit = function() {
    return this.get('amount') > 0;
  };
  TimelineEvent.prototype.isSocial = function() {
    return false;
  };
  TimelineEvent.prototype.description = function() {
    return this.depositOrWithdrawal();
  };
  TimelineEvent.prototype.meta = function() {
    return '';
  };
  TimelineEvent.prototype.map = function() {
    return "http://www.google.com/maps/vt/data=LtgX-e3f8ctI3U5dJtbt7EJ1ZfRneYme,xr1VycLGhw6JTyXHga0_5_rOcUkmBglaDj54UK1Pl3Q61KqxI7PKrPOitiqBc3I6vhIGdvPSpmb2yZN3Xv4RQ09i_YMotqFsn2SrqspXx-0c8v2Xkw";
  };
  TimelineEvent.prototype.className = function() {
    return this.depositOrWithdrawal().toLowerCase();
  };
  TimelineEvent.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      description: this.description,
      meta: this.meta,
      html_class: this.html_class,
      formatted_timestamp: this.formatted_timestamp,
      formatted_date: this.formatted_date,
      formatted_amount: this.formatted_amount,
      map: this.map
    });
  };
  TimelineEvent.prototype.toDetailJSON = function() {
    return this.toViewJSON();
  };
  TimelineEvent.prototype.toUpdateJSON = function() {
    var eventFields;
    eventFields = {};
    _.each(this.updateFields, __bind(function(field) {
      return eventFields[field] = this.get(field);
    }, this));
    return {
      event: eventFields
    };
  };
  TimelineEvent.prototype.trackEventActivity = function() {
    if (this.hasChanged('teller_rating') || this.hasChanged('vendor_rating')) {
      mpq.push([
        'track', 'Provide event rating', {
          event_type: this.get('event_type'),
          id: event.id
        }
      ]);
    }
    if (this.hasChanged('teller_comment') || this.hasChanged('vendor_comment')) {
      return mpq.push([
        'track', 'Provide event comment', {
          event_type: this.get('event_type'),
          id: event.id
        }
      ]);
    }
  };
  return TimelineEvent;
})();