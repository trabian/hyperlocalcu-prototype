define ['text!views/timeline/events/statement/row.handlebars?v=1', 'app/views/members/events/row'], (template, EventRowView) ->

  class StatementRow extends EventRowView

    template: Handlebars.compile(template)
