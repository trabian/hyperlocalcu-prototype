define ['member-timeline/views/comment_view'], (CommentView) ->

  class RatingView extends Backbone.View

    tagName: 'div'

    className: 'rating'

    events:
      'click .cancel': 'resetRating'
      'click .commentLink': 'toggleCommentForm'

    render: ->

      @rating = @model.get('rating') || 0

      this.addCancel()

      for num in [1..5]
        this.addStar num, (num <= @rating)

      commentLink = this.make "a", {
        href: '#'
        className: 'commentLink'
      }, 'comment'

      $(@el).append commentLink

      this.$('.commentLink').addClass('active') if @model.get('comment')?

      $(@el).addClass('rated active') if @rating > 0

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

      @model.save
        rating: 0

      @currentStar = null

      $(@el).removeClass 'rated'

      this.fillStar()

      false

    addStar: (num, starOn)=>

      star = this.make "a", {
        href: '#'
        className: "star#{if starOn then ' on' else ''}"
      }, num

      @currentStar = star if starOn

      $(star).bind 'mouseenter', =>
        this.fillStar(star)

      $(star).bind 'mouseleave', =>
        this.fillStar(@currentStar)

      $(star).bind 'click', =>

        @model.save
          rating: num

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

        @commentView.bind 'show', =>
          this.$('.commentLink').addClass('active')

        @commentView.bind 'hide', =>
          this.$('.commentLink').removeClass('active') unless @model.get('comment')?

        @options.commentParent.append @commentView.render().el
