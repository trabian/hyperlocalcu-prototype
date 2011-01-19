define ['text!views/timeline/events/check/detail.handlebars?v=2', 'app/views/timeline/events/detail', 'app/views/common/feedback/comment_view', 'vendor/handlebars'], (template, EventDetailView, CommentView) ->

  class CheckDetailView extends EventDetailView

    eventTypeOptions:

      events: 
        "click .report-problems": 'toggleCheckCommentView'

      template: Handlebars.compile(template)

    toggleCheckCommentView: =>
      if @checkCommentView? && @checkCommentView.isActive() then @checkCommentView.hide() else this.showCheckCommentView()

      return false

    showCheckCommentView: =>

      if @checkCommentView?
        @checkCommentView.show()
      else
        @checkCommentView = new CommentView
          model: @model
          commentField: 'check_image_comment'
          title: 'Problems with the check image?'
          buttonText: 'Report problem'

        this.$('.check-image').append @checkCommentView.render().el

