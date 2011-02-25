App.model.extension.Selectable = {
  selected: function() {
    return this.filter(function(record) {
      return record.get('selected');
    });
  },
  selectOne: function(record_or_id) {
    var record;
    record = _.isFunction(record_or_id) ? record_or_id : this.get(record_or_id);
    _.each(this.selected(), function(selectedRecord) {
      return selectedRecord.set({
        'selected': false
      });
    });
    if (record != null) {
      record.set({
        'selected': true
      });
      return this.trigger('selectOne', record);
    }
  },
  current: function() {
    var selectedAccounts;
    selectedAccounts = this.selected();
    if (_.isEmpty(selectedAccounts)) {
      return typeof this.defaultSelected == "function" ? this.defaultSelected() : void 0;
    } else {
      return _.first(selectedAccounts);
    }
  }
};