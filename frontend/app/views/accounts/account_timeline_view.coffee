class App.view.AccountTimeline extends Backbone.View

  id: 'account-timeline'

  initialize: ->

    this.bindTimeline()

    @template = App.templates['accounts/timeline']

    @collection = @model.events

    @collection.unbind 'refresh'
    @collection.bind 'refresh', @addAll

    @rowFactory = new App.view.MemberTimelineRowFactory

  render: =>

    $(@el).html @template(@model.toJSON)

    @eventContainer = this.$('tbody')

    if @collection.length is 0
      @collection.fetch()
    else
      this.addAll()

    return this

  buildView: (model) =>
    @rowFactory.build model, @collection

_.extend App.view.AccountTimeline::, App.view.extension.Timeline
