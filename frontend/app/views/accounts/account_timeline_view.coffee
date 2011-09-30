class App.view.AccountTimeline extends Backbone.View

  id: 'account-timeline'

  initialize: ->

    this.bindTimeline()

    @template = App.templates['accounts/timeline']

    @collection = @model.events

    @collection.bind 'refresh', @addAll

    @rowFactory = new App.view.MemberTimelineRowFactory

  render: =>

    $(@el).html @template(@model.toJSON)

    @eventContainer = this.$('tbody')

    if @collection.fetched?
      this.addAll()
    else
      @collection.fetched = true
      @collection.fetch()

    this.$('.search button').button
      icons:
        primary: 'ui-icon-search'

    return this

  buildView: (model) =>
    @rowFactory.build model, @collection

_.extend App.view.AccountTimeline::, App.view.extension.Timeline
