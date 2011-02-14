App.model.CustomSync = function(method, model, success, error) {
  var getUrl, methodMap, modelJSON, params, toJSONMethod, type;
  methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read': 'GET'
  };
  type = methodMap[method];
  toJSONMethod = model.toUpdateJSON || model.toJSON;
  modelJSON = method === 'create' || method === 'update' ? JSON.stringify(toJSONMethod.call(this)) : null;
  getUrl = function(object) {
    if (_.isFunction(object.url)) {
      return object.url();
    } else {
      return object.url;
    }
  };
  params = {
    url: getUrl(model),
    type: type,
    contentType: 'application/json',
    data: modelJSON,
    dataType: 'json',
    processData: false,
    success: success,
    error: error
  };
  return $.ajax(params);
};