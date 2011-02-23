App.helper or= {}

App.helper.currency = {

  format: (amount) ->
    sign = if amount < 0 then '<span class="sign">-</span>' else ''
    "#{sign}<span class='currency'>$</span>#{$.currency(Math.abs(amount))}"

}
