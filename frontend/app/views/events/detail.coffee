class App.view.EventDetail extends Backbone.View

  templatePath: 'events/detail'

  initialize: ->

  render: =>

    $(@el).html App.templates[@templatePath](@model.toDetailJSON())

    $(@el).bind 'hide', =>
      @model.set
        selected: false

    this.decorateAndShow()

    return this

  decorateAndShow: =>

    if @model.isDeposit()
      $(@el).addClass 'deposit'

    $(@el).drawer 'show'

  #initialize: ->

    #if @eventTypeOptions?
      #if @eventTypeOptions.events?
        #this.delegateEvents(@eventTypeOptions.events)
      #if @eventTypeOptions.templatePath?
        #@eventTypeOptions.template = App.templates[@eventTypeOptions.templatePath]

  #render: =>

    #if @model.isSocial()
      #@footer.show()
      #@socialView = new App.view.Social
        #model: @model

      #@footer.append @socialView.render().el

    #if @eventTypeOptions? and @eventTypeOptions.template?
      #@detail.append @eventTypeOptions.template(detailJSON)

    #this.show()

    #if @renderDetail?
      #this.renderDetail()

    #@model.feedbacks.bind 'refresh', @renderFeedback
    #@model.feedbacks.fetch()

    #this.trigger 'rendered'

  #renderFeedback: =>

    #if @model.get('merchant')?
      #this.addLocationFeedbackView 'merchant',
        #include_summary_view: true

  #addLocationFeedbackView: (field, options) =>

    #feedback = @model.feedbacks.for_subject(field)

    #if feedback?

      #@addressEl = @detail.find('.address')

      #ratingViewOptions = _.extend
        #model: feedback
        #commentParent: @addressEl
        #commentFormTitle: "Care to elaborate?"
      #, options

      #@locationRatingView = new App.view.Rating ratingViewOptions

      ##@locationRatingView.bind 'expand', @resize
      ##@locationRatingView.bind 'collapse', @resize

      #@addressEl.append @locationRatingView.render().el

      #@feedbackSummaryView = new App.view.FeedbackSummary

      #@addressEl.append @feedbackSummaryView.render().el

  #addFeedbackView: (subject_types...) =>
    #_.each subject_types, (subject_type) =>

      #feedback = @model.feedbacks.for_subject(subject_type)

      #if feedback?
        #@feedbackView = new App.view.Feedback
          #model: feedback
          #question: @model.feedbackQuestion

        ##@feedbackView.bind 'expand', @resize
        ##@feedbackView.bind 'collapse', @resize

        #@detail.append @feedbackView.render().el
