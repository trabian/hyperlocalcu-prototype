class App.view.Feedback extends Backbone.View

  tagName: 'div'

  className: 'feedback'

  initialize: (options)->

    super(options)

    @template = App.templates['common/feedback/feedback']

    @subject = @model.subject
    @question = options.question || @subject.get('question')

  render: ->

    $(@el).html @template(
      avatar: @subject.get('avatar')
      question: @question
    )

    ratingView = new App.view.Rating
      model: @model
      commentParent: $(@el)
      commentFormTitle: "Care to elaborate?"

    ratingView.bind 'expand', =>
      this.trigger 'expand'

    ratingView.bind 'collapse', =>
      this.trigger 'collapse'

    this.$('.question').after ratingView.render().el

    return this
