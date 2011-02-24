App.model.extension.Selectable = {
  selected: function() {
    return this.filter(function(record) {
      return record.get('selected');
    });
  },
  selectOne: function(record) {
    _.each(this.selected(), function(selectedRecord) {
      return selectedRecord.set({
        'selected': false
      });
    });
    if (record != null) {
      record.set({
        'selected': true
      });
      console.log('this', record.get('id'));
      return this.trigger('selectOne', record);
    }
  },
  current: function() {
    var selectedAccounts;
    selectedAccounts = this.selected();
    if (_.isEmpty(selectedAccounts)) {
      return typeof this.defaultSelected === "function" ? this.defaultSelected() : void 0;
    } else {
      return _.first(selectedAccounts);
    }
  }
};