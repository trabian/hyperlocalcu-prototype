# The Member model acts as a container for accounts,
# existing rewards, and other member-related information.
define ->

  class Member extends Backbone.Model

    cityState: =>
      [this.get('city'), this.get('region')].join(', ')
