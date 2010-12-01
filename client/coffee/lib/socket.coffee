define ["order!vendor/socket_io", "order!vendor/juggernaut"], (socket_io, juggernaut) ->

  class Socket

    listenTo: (model) =>

      @jug or= new Juggernaut

      @jug.subscribe model.url, (data) =>
        model.trigger data.event, data.object

  new Socket
