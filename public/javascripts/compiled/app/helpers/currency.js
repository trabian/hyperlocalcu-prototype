App.helper || (App.helper = {});
App.helper.currency = {
  format: function(amount) {
    var sign;
    sign = amount < 0 ? '<span class="sign">-</span>' : '';
    return "" + sign + "<span class='currency'>$</span>" + ($.currency(Math.abs(amount)));
  }
};