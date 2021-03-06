#define ["text!views/feedback/comment.handlebars?v=4"], (template) ->
 
class App.view.Comment extends Backbone.View

  tagName: 'div'

  className: 'comment'

  events:
    "click .cancel": "resetAndHide"
    "keyup textarea": 'updateButton'
    "click button": "submitComment"

  initialize: (options) ->

    @template = App.templates['common/feedback/comment']

    @commentField = @options.commentField

  render: =>

    $(@el).html @template(
      comment: @model.get(@commentField)
      title: @options.title
      buttonText: @options.buttonText || 'Share'
    )

    this.$('button').button
      icons:
        primary: 'ui-icon-comment'

    this.updateButton()

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
      this.showThanks()

  showThanks: =>
    this.hide()
    parent = $(@el).parent()
    parent.append('<p class="thanks">Thank you for your feedback!</p>')

    hideThanks = =>
      parent.find('.thanks').fadeOut()

    _.delay hideThanks, 3000
