var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
App.view.extension.Timeline = {
  addAll: function() {
    return this.collection.each(this.addOne);
  },
  addOne: function(model, position) {
    var rendered, view;
    view = this.buildView(model);
    rendered = view.render().el;
    if (position === 'top') {
      this.eventContainer.prepend(rendered);
    } else {
      this.eventContainer.append(rendered);
    }
    return this.addTimestampClass(view, model);
  },
  addTimestampClass: function(view, event) {
    if (event.day() === this.lastEventDay) {
      $(view.el).addClass('repeat-date');
    }
    return this.lastEventDay = event.day();
  },
  refreshTimestamps: __bind(function() {
    var previousDay;
    previousDay = null;
    return this.eventContainer.find('tr').each(__bind(function(index, row) {
      var day;
      day = $(row).find('>td:first-child').text();
      if (day === previousDay) {
        $(row).addClass('repeat-date');
      } else {
        $(row).removeClass('repeat-date');
      }
      return previousDay = day;
    }, this));
  }, this),
  bindTimeline: function() {
    return _.bindAll(this, "addAll", "addOne", "addTimestampClass", "refreshTimestamps");
  }
};