define ["vendor/jquery-ui", "vendor/jquery-form"], (jqueryUI) ->

  class OfferView extends Backbone.View

    initialize: ->
      this.render()

    loadTemplate: (templateName, callback) ->

      window.offerTemplates or= {}

      compiledTemplate = window.offerTemplates[templateName]

      if compiledTemplate?
        callback.call(this, compiledTemplate) if compiledTemplate?

      else

        templateLocation = "views/offers/templates/#{templateName}.handlebars?v=2"

        require ["text!#{templateLocation}"], (offerTemplate) ->

          compiledTemplate = Handlebars.compile(offerTemplate)

          window.offerTemplates[templateName] = compiledTemplate

          callback.call(this, compiledTemplate)

    render: =>

      this.loadTemplate @model.template, (compiledTemplate) =>

        formContents = compiledTemplate
          question: @model.options.question
          additional_question: @model.options.additional_question

        $(@el).append(formContents)

        this.$('.submit').button
          icons:
            primary: 'ui-icon-check'

        $(@el).ajaxForm =>
          alert("yep, you submitted a question: #{this.$('textarea').val()}")
