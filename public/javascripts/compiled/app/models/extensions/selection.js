App.model.extension.Selectable = {
  selected: function() {
    return this.filter(function(record) {
      return record.get('selected');
    });
  },
  selectOne: function(record_or_id) {
    var record, _ref;
    record = _.isFunction(record_or_id) ? record_or_id : this.get(record_or_id);
    if (record !== this.selectedRecord) {
      if ((_ref = this.selectedRecord) != null) {
        _ref.set({
          'selected': false
        });
      }
      if (record != null) {
        this.selectedRecord = record;
        record.set({
          'selected': true
        });
        this.trigger('selectOne', record);
      }
    }
    return record;
  },
  current: function() {
    return this.selectedRecord || (typeof this.defaultSelected == "function" ? this.defaultSelected() : void 0);
  }
};