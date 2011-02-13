define ["text!views/timeline/events/detail.handlebars?v=9", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-mousewheel", "vendor/jquery-jscrollpane"], (template, SocialView, FeedbackView, RatingView) ->

  class EventDetailView extends Backbone.View

    events:
      "click .close": "close"

    template: Handlebars.compile(template)

    initialize: ->
      if @eventTypeOptions? and @eventTypeOptions.events?
        this.delegateEvents(@eventTypeOptions.events)

    close: =>
      @model.set 'selected': false

    render: =>

      mpq.push ["track", "View event detail", {
        event_type: @model.get('event_type')
        id: @model.id
      }]

      @model.initializeDetails()

      detailJSON = @model.toDetailJSON()

      $(@el).html @template(detailJSON)

      @header = this.$('#event-header')
      @detail = this.$('#event-detail')
      @wrapper = this.$('#event-detail-wrapper')
      @footer = this.$('#event-footer')

      if @model.isSocial()
        @socialView = new SocialView
          model: @model

        @footer.append @socialView.render().el

      if @eventTypeOptions? and @eventTypeOptions.template?
        @detail.append @eventTypeOptions.template(detailJSON)

      if @renderDetail?
        this.renderDetail()

      if @model.isDeposit()
        @header.addClass('deposit')

      if @model.get('merchant')?
        this.addMerchantFeedbackView()

      this.show()

      @wrapper.jScrollPane()

      @scroll = @wrapper.data('jsp')

      @heightOffset = parseInt($(@el).css('top')) + @header.height() + 130

      $(window).bind 'resize', @resize

      $(window).trigger 'resize'

    resize: =>

      height = $(window).height()

      @wrapper.height(height - @heightOffset)

      if $.browser.ie

        if !throttleTimeout
          setTimeout =>
            @scroll.reinitialise()
            throttleTimeout = null
          , 50

      else
        @scroll.reinitialise()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()

    addMerchantFeedbackView: =>

      feedback = @model.feedbacks.for_subject('merchant')

      if feedback?

        @merchantDetails = @detail.find('.address')

        @merchantRatingView = new RatingView
          model: feedback
          commentParent: @merchantDetails
          commentFormTitle: "Care to elaborate?"

        @merchantRatingView.bind 'expand', @resize
        @merchantRatingView.bind 'collapse', @resize

        @merchantDetails.append @merchantRatingView.render().el

    addFeedbackView: (subject_types...) =>
      _.each subject_types, (subject_type) =>

        feedback = @model.feedbacks.for_subject(subject_type)

        if feedback?
          @feedbackView = new FeedbackView
            model: feedback
            question: @model.feedbackQuestion

          @feedbackView.bind 'expand', @resize
          @feedbackView.bind 'collapse', @resize

          @detail.append @feedbackView.render().el
