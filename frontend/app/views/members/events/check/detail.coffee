define ['text!views/timeline/events/check/detail.handlebars?v=7', 'app/views/members/events/detail', 'app/views/common/feedback/comment_view', 'app/views/merchants/search_view', 'vendor/handlebars', 'vendor/jquery-colorbox'], (template, EventDetailView, CommentView, MerchantSearchView) ->

  class CheckDetailView extends EventDetailView

    initialize: ->

      mpq.push ["track", "View billpay offer"]

      @model.bind 'change:merchant', @render

      super()

    eventTypeOptions:

      events: 
        "click .report-problems": 'toggleCheckCommentView'

      template: Handlebars.compile(template)

    toggleCheckCommentView: =>
      if @checkCommentView? && @checkCommentView.isActive() then @checkCommentView.hide() else this.showCheckCommentView()

      return false

    renderDetail: =>

      this.$('.available-service li a').button()

      this.$('.check-image a').colorbox()

      this.addMerchantSearchView() unless @model.get('merchant')?

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

    addMerchantSearchView: =>
      @merchantSearchView = new MerchantSearchView
        model: @model
        searchPrompt: "Search for merchant information:"

      this.$('#event-detail').prepend @merchantSearchView.render().el

