require({
  baseUrl: "/javascripts/compiled"
}, ["order!vendor/underscore", "order!vendor/backbone", "order!member-timeline/member_timeline_controller"], function(underscore, backbone, Timeline) {
  return describe("Timeline", function() {
    beforeEach(function() {
      Timeline.items.clear();
      $('#timeline').remove();
      $('body').append('<table id="timeline"><thead></thead><tbody></tbody></table>');
      return (Timeline.timeline.el = $('#timeline tbody'));
    });
    return it("should add a timeline event to the timeline", function() {
      Timeline.items.add({
        name: "testing",
        timestamp: "2010-10-28",
        amount: -30.45
      });
      Timeline.items.trigger('refresh');
      return expect($('#timeline tbody tr').length).toEqual(1);
    });
  });
});