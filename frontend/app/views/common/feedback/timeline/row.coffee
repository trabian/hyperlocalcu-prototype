class App.view.FeedbackRow extends Backbone.View

  tagName: 'tr'

  className: 'feedback'

  initialize: ->

    @template = App.templates['common/feedback/timeline/row']

    @model.bind 'change', =>
      this.render()

    this.render()

  render: ->

    $(@el).html @template(@model.toViewJSON())

    ratingView = new App.view.Rating
      model: @model
      rating: @model.get('rating')
      readOnly: true

    this.$('.rating').append ratingView.render().el

    return this
