define ["app/controllers/common/timeline_controller", "app/views/common/feedback/feedback_timeline_view", "app/views/feedback_subjects/feedback_subject_overview", "app/lib/socket"], (TimelineController, FeedbackTimelineView, FeedbackSubjectOverviewView, socket) ->

  class FeedbackDashboardController extends TimelineController

    initialize: (options) ->

      @subject = options.subject

      options.events = @subject.feedbacks

      super(options)

      @overview = new FeedbackSubjectOverviewView
        model: @subject

      $('#subject-overview').append @overview.render().el

      @timeline = new FeedbackTimelineView
        collection: @subject.feedbacks

      socket.listenTo @subject
