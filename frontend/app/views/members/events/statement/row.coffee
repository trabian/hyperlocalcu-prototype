#define ['text!views/timeline/events/statement/row.handlebars?v=1', 'app/views/members/events/row'], (template, EventRowView) ->

class App.view.StatementRow extends App.view.EventRow

  templatePath: 'members/events/statement/row'
