EventTypes = ['atm', 'branch', 'billpay', 'check', 'nsf', 'reward', 'statement']

EventTypeDefinitions = _.map EventTypes, (event_type) ->
  "app/models/events/#{event_type}_event"

EventTypeDefinitions.unshift 'app/models/event'

define EventTypeDefinitions, (event_classes...) ->

  class EventFactory

    getEvent: (model) ->

      index = _.indexOf(EventTypes, model.event_type) + 1

      event_class = event_classes[index] || event_classes[0]

      new event_class(model)

  return new EventFactory()
