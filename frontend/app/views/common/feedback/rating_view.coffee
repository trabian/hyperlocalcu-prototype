define ['app/views/common/feedback/comment_view'], (CommentView) ->

  class RatingView extends Backbone.View

    tagName: 'div'

    className: 'rating'

    events:
      'click .cancel': 'resetRating'
      'click .commentLink': 'toggleCommentForm'

    initialize: (options) ->
      options.commentField = 'comment'

    render: ->

      @rating = @options.rating || @model.get('rating') || 0

      @readOnly = (@options.readOnly == true)

      this.addCancel() unless @readOnly

      for num in [1..5]
        this.addStar num, (num <= @rating), @readOnly

      unless @readOnly
        commentLink = this.make "a", {
          href: '#'
          className: 'commentLink'
        }, 'comment'

        $(@el).append commentLink

        if @model.get(@options.commentField)
          this.$('.commentLink').addClass('active')
          this.showCommentForm()

        $(@el).addClass('rated active') if @rating > 0

      else
        $(@el).addClass('readonly active')

      this

    imagePath: (name)->
      "/images/ratings/#{name}.png"

    addCancel: =>

      cancel = this.make "a", {
        href: '#'
        className: 'cancel'
      }, 'cancel'

      $(@el).append cancel

    resetRating: =>

      this.updateRating 0

      @currentStar = null

      $(@el).removeClass 'rated'

      this.fillStar()

      false

    updateRating: (num) =>

      @model.save 'rating': num

    addStar: (num, starOn, readOnly)=>

      starTag = if readOnly then "span" else "a"

      star = this.make starTag, {
        className: "star#{if starOn then ' on' else ''}"
      }, num

      @currentStar = star if starOn

      unless readOnly

        $(star).attr('href', '#')

        $(star).bind 'mouseenter', =>
          this.fillStar(star)

        $(star).bind 'mouseleave', =>
          this.fillStar(@currentStar)

        $(star).bind 'click', =>

          this.updateRating num

          @currentStar = star

          this.fillStar(@currentStar)

          this.showCommentForm()

          $(@el).addClass 'rated'

          false

      $(@el).append star

    fillStar: (star) =>

      if star?
        $(star).prevAll().andSelf().addClass 'on'
        $(star).nextAll().removeClass 'on'
        $(@el).addClass 'active'
      else
        this.$('.star').removeClass 'on'
        $(@el).removeClass 'active'

    toggleCommentForm: =>

      if @commentView? && @commentView.isActive() then @commentView?.hide() else this.showCommentForm()
      return false

    showCommentForm: =>

      $(@el).addClass('active')

      if @commentView?
        @commentView.show()
      else
        @commentView = new CommentView
          model: @model
          commentField: @options.commentField
          title: @options.commentFormTitle

        @commentView.bind 'show', =>
          this.$('.commentLink').addClass('active')

        @commentView.bind 'hide', =>
          this.$('.commentLink').removeClass('active') unless @model.get(@options.commentField)?

        @options.commentParent.append @commentView.render().el

