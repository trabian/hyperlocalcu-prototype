var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'vendor/jquery-timeago', 'text!views/demo/snapshot.handlebars?v=6'], function(handlebars, timeago, template) {
  var SnapshotView;
  SnapshotView = function() {
    var _a;
    _a = this;
    this.restore = function(){ return SnapshotView.prototype.restore.apply(_a, arguments); };
    this.destroy = function(){ return SnapshotView.prototype.destroy.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(SnapshotView, Backbone.View);
  SnapshotView.prototype.events = {
    "click .delete": "destroy",
    "click .restore": "restore"
  };
  SnapshotView.prototype.tagName = 'li';
  SnapshotView.prototype.className = 'snapshot';
  SnapshotView.prototype.template = Handlebars.compile(template);
  SnapshotView.prototype.initialize = function() {
    this.model.bind('change', this.render);
    return this.model.bind('restore', function() {
      window.location.hash = '#';
      return window.location.reload();
    });
  };
  SnapshotView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$('.timestamp').text($.timeago(this.model.get('timestamp')));
    this.$('.restore').button({
      icons: {
        primary: 'ui-icon-check'
      }
    });
    this.$('.delete').button({
      icons: {
        primary: 'ui-icon-close'
      }
    });
    return this;
  };
  SnapshotView.prototype.destroy = function() {
    if (confirm("Are you sure you want to remove this snapshot?")) {
      this.model.destroy();
      return this.remove();
    }
  };
  SnapshotView.prototype.restore = function() {
    return confirm("Are you sure you want to restore this snapshot?") ? this.model.restore() : null;
  };
  return SnapshotView;
});