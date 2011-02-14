class App.view.CheckDetail extends App.view.EventDetail

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
      @checkCommentView = new App.view.Comment
        model: @model
        commentField: 'check_image_comment'
        title: 'Problems with the check image?'
        buttonText: 'Report problem'

      this.$('.check-image').append @checkCommentView.render().el

  addMerchantSearchView: =>
    @merchantSearchView = new App.view.MerchantSearch
      model: @model
      searchPrompt: "Search for merchant information:"

    this.$('#event-detail').prepend @merchantSearchView.render().el
