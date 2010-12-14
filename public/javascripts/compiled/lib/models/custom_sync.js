define(function() {
  var CustomSync;
  return (CustomSync = function(method, model, success, error) {
    var getUrl, methodMap, modelJSON, params, toJSONMethod, type;
    methodMap = {
      'create': 'POST',
      'update': 'PUT',
      'delete': 'DELETE',
      'read': 'GET'
    };
    type = methodMap[method];
    toJSONMethod = model.toUpdateJSON || model.toJSON;
    modelJSON = ('create' === method || 'update' === method) ? JSON.stringify(toJSONMethod.call(this)) : null;
    getUrl = function(object) {
      return _.isFunction(object.url) ? object.url() : object.url;
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
  });
});