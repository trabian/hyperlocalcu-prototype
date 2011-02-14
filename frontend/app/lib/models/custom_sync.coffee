App.model.CustomSync = (method, model, success, error)->

  methodMap =
    'create': 'POST'
    'update': 'PUT'
    'delete': 'DELETE'
    'read'  : 'GET'
  
  type = methodMap[method]

  toJSONMethod = model.toUpdateJSON || model.toJSON

  modelJSON = if method in ['create', 'update'] then JSON.stringify(toJSONMethod.call(this)) else null

  getUrl = (object) ->
    if _.isFunction(object.url) then object.url() else object.url

  params =
    url:          getUrl(model)
    type:         type
    contentType:  'application/json'
    data:         modelJSON
    dataType:     'json'
    processData:  false
    success:      success
    error:        error

  $.ajax params


