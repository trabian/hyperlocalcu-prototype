App.model.extension.Selectable =
  
  selected: ->
    this.filter (record) ->
      record.get 'selected'

  selectOne: (record_or_id) ->

    record = if _.isFunction(record_or_id) then record_or_id else this.get(record_or_id)

    _.each this.selected(), (selectedRecord) ->
      selectedRecord.set 'selected': false

    if record?
      record.set 'selected': true
      this.trigger 'selectOne', record

  current: ->

    selectedAccounts = this.selected()

    if _.isEmpty(selectedAccounts)
      return this.defaultSelected?()
    else
      return _.first(selectedAccounts)
