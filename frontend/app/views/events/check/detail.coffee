class App.view.CheckDetail extends Backbone.View

  initialize: ->
    @model.bind 'change:merchant', @render

  events: 
    "click .report-problems": 'toggleCheckCommentView'

  render: =>

    $(@el).html App.templates['events/check/detail'](@model.toDetailJSON())

    this.$('.available-service li a').button()

    this.$('.check-image ul a').colorbox()

    return this

  renderFeedback: =>

    @options.parent.renderLocationFeedbackView 'merchant' if @model.get('merchant')

  toggleCheckCommentView: =>
    if @checkCommentView? && @checkCommentView.isActive() then @checkCommentView.hide() else this.showCheckCommentView()

  showCheckCommentView: =>

    if @checkCommentView?

      @checkCommentView.show()

    else

      @checkCommentView = new App.view.Comment
        model: @model
        commentField: 'check_image_comment'
        title: 'Problems with the check image?'
        buttonText: 'Report problem'

      @checkCommentView.bind 'show', @options.parent.resize
      @checkCommentView.bind 'hide', @options.parent.resize

      this.$('.check-image').append @checkCommentView.render().el

      @checkCommentView.trigger 'show'

App.view.EventDetailFactory.check = App.view.CheckDetail
