define ['text!views/timeline/members/statement/row.handlebars?v=1', 'app/views/timeline/event'], (template, EventView) ->

  class StatementRow extends EventView

    template: Handlebars.compile(template)
