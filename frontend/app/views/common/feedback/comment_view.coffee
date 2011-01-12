define ["text!views/feedback/comment.handlebars?v=2"], (template) ->

  class CommentView extends Backbone.View

    tagName: 'div'

    className: 'comment'

    events:
      "click .cancel": "resetAndHide"
      "keyup textarea": 'updateButton'
      "click button": "submitComment"

    initialize: (options) ->
      @commentField = @options.commentField

    template: Handlebars.compile(template)

    render: =>

      $(@el).html @template(
        comment: @model.get(@commentField)
        title: @options.title
      )

      this.$('button').button
        icons:
          primary: 'ui-icon-comment'

      this.updateButton()

      this.trigger 'show'

      return this

    updateButton: =>
      if $.trim(this.$('textarea').val()).length > 0
        this.$('button').button('enable')
      else
        this.$('button').button('disable')

    show: =>
      $(@el).show()
      this.trigger('show')

    hide: =>
      $(@el).hide()
      this.trigger('hide')

    isActive: =>
      $(@el).is(":visible")

    resetAndHide: =>
      this.$('textarea').val(@model.get(@commentField))
      this.hide()
      return false

    submitComment: =>
      unless this.$('button').button('option', 'disabled')
        commentAttributes = {}
        commentAttributes[@commentField] = this.$('textarea').val()
        @model.save commentAttributes

