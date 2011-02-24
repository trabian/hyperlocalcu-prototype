App.model.extension.Selectable =
  
  selected: ->
    this.filter (record) ->
      record.get 'selected'

  selectOne: (record) ->

    _.each this.selected(), (selectedRecord) ->
      selectedRecord.set 'selected': false

    if record?

      record.set 'selected': true

      console.log 'this', record.get('id')

      this.trigger 'selectOne', record

  current: ->

    selectedAccounts = this.selected()

    if _.isEmpty(selectedAccounts)
      return this.defaultSelected?()
    else
      return _.first(selectedAccounts)
