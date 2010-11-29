var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'vendor/jquery-ui', 'demo/views/snapshot_view', 'demo/models/snapshot_list', 'text!views/demo/snapshot_dialog.handlebars?v=10'], function(handlebars, ui, SnapshotView, SnapshotList, template) {
  var SnapshotDialogView;
  SnapshotDialogView = function() {
    var _a;
    _a = this;
    this.submitForm = function(){ return SnapshotDialogView.prototype.submitForm.apply(_a, arguments); };
    this.updateOnEnter = function(){ return SnapshotDialogView.prototype.updateOnEnter.apply(_a, arguments); };
    this.updateForm = function(){ return SnapshotDialogView.prototype.updateForm.apply(_a, arguments); };
    this.addAll = function(){ return SnapshotDialogView.prototype.addAll.apply(_a, arguments); };
    this.addOne = function(){ return SnapshotDialogView.prototype.addOne.apply(_a, arguments); };
    this.open = function(){ return SnapshotDialogView.prototype.open.apply(_a, arguments); };
    this.close = function(){ return SnapshotDialogView.prototype.close.apply(_a, arguments); };
    this.render = function(){ return SnapshotDialogView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(SnapshotDialogView, Backbone.View);
  SnapshotDialogView.prototype.id = 'snapshot-dialog';
  SnapshotDialogView.prototype.events = {
    "keypress input.text": "updateOnEnter",
    "keyup input.text": "updateForm",
    "click .form button": "submitForm"
  };
  SnapshotDialogView.prototype.template = Handlebars.compile(template);
  SnapshotDialogView.prototype.render = function() {
    $(this.el).html(this.template());
    return $(this.el).dialog({
      title: "Snapshots",
      width: 460,
      height: 400,
      open: this.open,
      close: this.close
    });
  };
  SnapshotDialogView.prototype.close = function(event, ui) {
    this.remove();
    return (window.location.hash = '#');
  };
  SnapshotDialogView.prototype.open = function(event, ui) {
    this.snapshots = new SnapshotList();
    this.snapshots.bind('refresh', this.addAll);
    this.snapshots.fetch();
    this.delegateEvents();
    return this.$('.form button').button({
      disabled: true
    });
  };
  SnapshotDialogView.prototype.addOne = function(snapshot, bottom) {
    var list, view;
    if (bottom === null) {
      bottom = false;
    }
    view = new SnapshotView({
      model: snapshot,
      collection: this.snapshots
    });
    list = this.$('.snapshot-list');
    snapshot = view.render().el;
    return (bottom) ? list.append(snapshot) : list.prepend(snapshot);
  };
  SnapshotDialogView.prototype.addAll = function() {
    this.$('.snapshot-list').empty();
    return this.snapshots.each(this.addOne);
  };
  SnapshotDialogView.prototype.updateForm = function() {
    var name;
    this.field || (this.field = this.$('input.name'));
    this.button || (this.button = this.$('.form button'));
    name = $.trim(this.field.val());
    return name.length > 0 ? this.button.button('enable') : this.button.button('disable');
  };
  SnapshotDialogView.prototype.updateOnEnter = function(e) {
    return e.keyCode === 13 ? this.submitForm() : null;
  };
  SnapshotDialogView.prototype.submitForm = function() {
    var name;
    name = $.trim(this.$('input.name').val());
    if (name.length > 0) {
      this.snapshots.create({
        "name": this.$('input.name').val()
      });
      return this.snapshots.fetch();
    }
  };
  return SnapshotDialogView;
});