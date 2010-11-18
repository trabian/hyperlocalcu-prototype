var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "vendor/jquery-form"], function(jqueryUI) {
  var OfferView;
  OfferView = function() {
    var _a;
    _a = this;
    this.render = function(){ return OfferView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(OfferView, Backbone.View);
  OfferView.prototype.initialize = function() {
    return this.render();
  };
  OfferView.prototype.loadTemplate = function(templateName, callback) {
    var compiledTemplate, templateLocation;
    window.offerTemplates || (window.offerTemplates = {});
    compiledTemplate = window.offerTemplates[templateName];
    if (typeof compiledTemplate !== "undefined" && compiledTemplate !== null) {
      if (typeof compiledTemplate !== "undefined" && compiledTemplate !== null) {
        return callback.call(this, compiledTemplate);
      }
    } else {
      templateLocation = ("views/offers/templates/" + (templateName) + ".handlebars?v=2");
      return require([("text!" + (templateLocation))], function(offerTemplate) {
        compiledTemplate = Handlebars.compile(offerTemplate);
        window.offerTemplates[templateName] = compiledTemplate;
        return callback.call(this, compiledTemplate);
      });
    }
  };
  OfferView.prototype.render = function() {
    return this.loadTemplate(this.model.template, __bind(function(compiledTemplate) {
      var formContents;
      formContents = compiledTemplate({
        question: this.model.options.question,
        additional_question: this.model.options.additional_question
      });
      $(this.el).append(formContents);
      this.$('.submit').button({
        icons: {
          primary: 'ui-icon-check'
        }
      });
      return $(this.el).ajaxForm(__bind(function() {
        return alert("yep, you submitted a question: " + (this.$('textarea').val()));
      }, this));
    }, this));
  };
  return OfferView;
});