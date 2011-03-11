App.model.extension.Selectable =
  
  selected: ->
    this.filter (record) ->
      record.get 'selected'

  selectOne: (record_or_id) ->

    record = if _.isFunction(record_or_id) then record_or_id else this.get(record_or_id)

    unless record == @selectedRecord

      @selectedRecord?.set 'selected': false

      if record?
        @selectedRecord = record
        record.set 'selected': true
        this.trigger 'selectOne', record

    record

  current: ->
    @selectedRecord || this.defaultSelected?()

  unselect: (event) ->

    if @selectedRecord == event
      @selectedRecord = null

    event.set
      selected: false
