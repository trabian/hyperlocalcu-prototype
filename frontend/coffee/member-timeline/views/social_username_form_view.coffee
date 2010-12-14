define ->

  class SocialUsernameFormView extends Backbone.View

    events:
      'click button': 'addUsername'
      'keypress input.text': 'addUsernameOnEnter'

    addUsernameOnEnter: (e)=>
      this.addUsername() if e.keyCode == 13

    addUsername: =>

      username = this.$('input.text').val()
      this.$('.form').html('Loading...')

      attrs = {}

      attrs[@options.fieldname] = username

      @model.save attrs
