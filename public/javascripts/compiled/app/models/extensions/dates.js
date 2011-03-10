App.model.extension.Dates = {
  formatDate: function(date, format) {
    format || (format = 'm/d/yy');
    return $.datepicker.formatDate(format, $.datepicker.parseDate('yy-m-d', date));
  }
};