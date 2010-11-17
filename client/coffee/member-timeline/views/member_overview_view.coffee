# In Progress: This is the summary view in the right sidebar
define ["vendor/jquery-ui", "text!views/member/overview.handlebars?version=3"], (jqueryUI, overviewTemplate) ->
  class MemberOverviewView extends Backbone.View

    # The template referenced here is provided by the `define` call above
    # and will be cached on both client and server.
    template: Handlebars.compile(overviewTemplate)

    # Render on initialization
    initialize: ->
      this.render()

    # Delegate 'show' method to element
    show: =>
      $(@el).show()

    # Delegate 'hide' method to element
    hide: =>
      $(@el).hide()

    render: ->

      $(@el).html @template(@model.toJSON())

      # Turn 'timeframe' button into jQuery UI button
      this.$('.timeframe span').button
        icons:
          primary: 'ui-icon-calendar'
          secondary: "ui-icon-triangle-1-s"
