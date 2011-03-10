App.model.extension.Dates =

  formatDate: (date, format) ->

    format or= 'm/d/yy'

    $.datepicker.formatDate(format, $.datepicker.parseDate('yy-m-d', date))
