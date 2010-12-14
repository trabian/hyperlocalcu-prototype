define ["vendor/jquery-ui", "vendor/jquery-form"], (jqueryUI) ->

  class OfferView extends Backbone.View

    initialize: (options) ->
      @item = options.item
      this.render()

    loadTemplate: (templateName, callback) ->

      window.offerTemplates or= {}

      compiledTemplate = window.offerTemplates[templateName]

      if compiledTemplate?
        callback.call(this, compiledTemplate) if compiledTemplate?

      else

        templateLocation = "views/offers/templates/#{templateName}.handlebars?v=6"

        require ["text!#{templateLocation}"], (offerTemplate) ->

          compiledTemplate = Handlebars.compile(offerTemplate)

          window.offerTemplates[templateName] = compiledTemplate

          callback.call(this, compiledTemplate)

    render: =>

      this.loadTemplate @model.template, (compiledTemplate) =>

        formContents = compiledTemplate
          question: @model.options.question
          additional_question: @model.options.additional_question
          reward: "Reward: #{@model.amount}"

        $(@el).append(formContents)

        this.$('.submit').button
          icons:
            primary: 'ui-icon-check'

        $(@el).ajaxForm
          dataType: 'json'
          success: (response) =>
            @item.set response
