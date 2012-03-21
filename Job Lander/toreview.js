window.jld = window.jld || {};
window.jld.toreview = {};

jld.toreview.getToReviewFeed = function(callback) {
    $.get(
          "http://joblander.herokuapp.com/users/1/positions.json?pstatus=to_review",
          function(data) {
          callback(data);
          }
          );
};

jld.toreview.renderFeed = function(prefix) {
    // Render the Move button inside Feed
	$(prefix + " .posMoveBtn button").button();
    $(prefix + " #posMoveExpanded button").button();
    // StepSelector in Feed
	$(prefix + " .posMoveBtn").click(function(){
        jld.pos.showMoveExpanded($(this),33,-100);
        var fid = $(this).parent('.feed').attr('fid');
        var element = $(".jld #posMoveExpanded");
        element.attr('fid', fid);
        // Mouse event for the float panel for move-to-step
        $(".jld #posMoveExpanded button").click(function() {
            var fid = $(this).parent("#posMoveExpanded").attr('fid');
            var feed = $(".jld #feed" + fid);
            var pstatus = $(this).attr('pstatus');
            jld.pos.createNewPosition(feed);
            $(".jld #posMoveExpandedLayer").click();
                                                
            // Move posElement to the new step
            jld.pos.constructStepBoxInnerHTML(feed);
            $('.jld #pos-' + pstatus).append(posElement);
            
            // TODO(baddth): add error handler
            // Update posBoxCount for new pstatus
            var count = parseInt($('.jld .posBoxCountVal-' + pstatus).html());
            $('.jld .posBoxCountVal-' + pstatus).html(count+1);
        });
    });
};