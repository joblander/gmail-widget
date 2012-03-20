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