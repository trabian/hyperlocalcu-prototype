define ['text!views/timeline/events/branch/detail.handlebars?v=2', 'app/views/timeline/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

  class BranchDetailView extends EventDetailView

    eventTypeTemplate: Handlebars.compile(template)

