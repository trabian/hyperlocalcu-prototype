class App.lib.Socket

  listenTo: (model) =>

    @pusher or= new Pusher(PUSHER_KEY)

    channel = @pusher.subscribe this.channelName(model)

    channel.bind_all (event, data) =>
      model.trigger event, data

  channelName: (model) =>
    model.url().replace(/^\//, '').replace(/\//, '_')

App.socket = new App.lib.Socket
