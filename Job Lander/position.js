/* Position Management related code goes here. */
window.jld = window.jld || {};
window.jld.pos = {};
window.jld.pos.steps = ['','to_apply','applied','to_schedule','interviewed','offered','rejected','not_interested'];
window.jld.pos.stepLabels = ['To Review','To Apply','Applied and Waiting','To Schedule','Interviewed and Waiting','Closed - got an offer','Closed - got rejected','Closed - not interested'];

// Dummy data for testing
jld.pos.getDummyPosition = function(id){
	var position = {};
	position.id = id;
	position.name = 'Dummy Position - Click me for more info';
	position.pstatus = "to_apply";
	position.details = "Here is a description for a dummy position";
	position.company = "Test Company";
	position.comments = "Here is where comments go";
	position.app_link = "http://www.google.com";
	position.app_due_date = "2011/01/01";
	return position;
};

jld.pos.getDummyList = function() {
	var res = [];
	for (var i = 0; i < 3; i++)
	{
		res.push(jld.pos.getDummyPosition(i));
	}
	return res;
};

// innerHTML for tab buttons.
// TODO(baddth): Replace image url properly.
jld.pos.tabButtonsInnerHTML = [];
jld.pos.tabButtonsInnerHTML.push(
	'<li class="ui-corner-all"><a href="#tabs-1">Positions<span class="notify round">10</span></a></li>',
	'<li style="border:0"><a href="#tabs-2" style="padding:0" id="tab-2-link"><img src="//baddth.com/jld/images/plus-icon.png" style="vertical-align:middle"></a></li>'
);
jld.pos.tabButtonsInnerHTML = jld.pos.tabButtonsInnerHTML.join("");

// innerHTML of a content inside Process Box (To Review, To Apply, ..., etc).
jld.pos.constructStepBoxInnerHTML = function(posList) {
	var html = [];
	html.push(
			'<b style="margin-left:208px">Active Positions</b>',
			'<ul style="background:none;border:0">',
			'<li class="stepBtn ui-state-default round">',
				'<a href="#stepTab-1">To Review',
					'<div class="posBoxCount round">0</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn stepBtn-to_apply ui-state-default">',
				'<a href="#stepTab-2">To Apply',
					'<div class="posBoxCount round posBoxCountVal-to_apply">', posList['to_apply'].length,'</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn stepBtn-applied ui-state-default">',
				'<a href="#stepTab-3">Applied and Waiting',
					'<div class="posBoxCount round posBoxCountVal-applied">', posList['applied'].length,'</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn stepBtn-to_schedule ui-state-default">',
				'<a href="#stepTab-4">To Schedule',
					'<div class="posBoxCount round posBoxCountVal-to_schedule">', posList['to_schedule'].length,'</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn stepBtn-interviewed ui-state-default" style="font-size:10px">',
				'<a href="#stepTab-5">Interviewed and Waiting',
					'<div class="posBoxCount round posBoxCountVal-interviewed">', posList['interviewed'].length,'</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn stepBtn-closed ui-state-default" style="font-size:10px;margin-left:10px">',
				'<a href="#stepTab-6">Closed',
					'<div class="posBoxCount round posBoxCountVal-closed">', posList['offered'].length + posList['rejected'].length + posList['not_interested'].length,'</div>',
				'</a>',
			'</li>',
			'</ul>',
			'<div style="clear:both"></div>');
	return html.join("");
};


// A function to construct an innerHTML for a single post
jld.pos.constructPosHTML = function(pos){
	var html = [];
	html.push(
		'<div class="pos" id="pos', pos.id,'" pid="', pos.id,'">',
			'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>',
			'<div class="posTitle">', pos.name, '</div>',
			'<div class="posDg posDelBtn" style="vertical-align:bottom;margin-left:5px">',
				'<span class="ui-button-icon-primary ui-icon ui-icon ui-icon-close"></span>',
			'</div>',
			'<div class="posDelExpanded" style="display:none">',
				'<button class="posDelConfirmBtn" style="margin: 0 0 0 10px">Delete</button>',
				'<button class="posDelCancelBtn" style="margin: 0 0 0 5px">Cancel</button>',
			'</div>',
			'<div class="posMoveBtn"><button>Move <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></button>',
			'</div>',
			'<div class="posDetail">',
				'<div class="posDesc">', pos.details, '</div>',
				'<div class="posMail">',
					'<div>Related Emails</div>',
					'<div>',
						'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>',
						'<div style="display:inline-block"><a href="#inbox">Conformation Email. Thanks for your submission.</a></div>',
						'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>',
					'</div>',
					'<div>',
						'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>',
						'<div style="display:inline-block"><a href="#inbox">Touchbase Email. Hello for recruiter.</a></div>',
						'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>',
					'</div>',
				'</div>',
				'<div class="posTask">',
					'<div>Related Tasks</div>',
					'<div>',
						'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>',
						'<div style="display:inline-block"><a href="#inbox">Prepare an interview with recruiter</a></div>',
						'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>',
					'</div>',
				'</div>',
			'</div>',
		'</div>');
	return html.join('');
};

// Construct an innerHTML for a group of positions
// positions = array of positions
// pstatus = Position status of this group of positions.
jld.pos.constructPosListHTML = function(positions, pstatus) {
	var html = ['<div class="positions" id="pos-'+pstatus+'">'];
	for (var i = 0; i < positions.length; i++) {
		html.push(jld.pos.constructPosHTML(positions[i]));
	}
	html.push('</div>');
	return html.join('');
};

// innerHTML of a content inside Positions tab.
jld.pos.constructStepTabsInnerHTML = function(posList) {
	var html = [];
	html.push(
			'<div id="stepTabs" style="border:0;margin:0;padding:0">',
				'<div id="stepBox" class="actions">',
					jld.pos.constructStepBoxInnerHTML(posList),
				'</div>',
				'<div id="stepTab-1" style="padding:0">',
					'<h3 style="text-align:left">',
						'<a href="#" title="Change Search" onclick="return false">',
							'Product Manager, San Francisco',
							'<div class="round ui-state-default" style="display:inline-block;vertical-align:bottom;cursor:pointer;margin-left:5px">',
								'<span class="ui-icon ui-icon-wrench" style="padding:1px"></span>',
							'</div>',
						'</a>',
					'</h3>',
				'</div>',
                // TODO(baddth): Use loop for below chunk instead
				'<div id="stepTab-2" style="padding:0">',
					'<h3>You have <span class="posBoxCountVal-to_apply">', posList['to_apply'].length,'</span>',
                      ' Positions listed as "To Apply"</h3>',
					jld.pos.constructPosListHTML(posList['to_apply'], 'to_apply'),
				'</div>',
				'<div id="stepTab-3" style="padding:0">',
					'<h3>You have <span class="posBoxCountVal-applied">', posList['applied'].length,'</span>',
                      ' Positions listed as "Applied and Waiting"</h3>',
					jld.pos.constructPosListHTML(posList['applied'], 'applied'),
				'</div>',
				'<div id="stepTab-4" style="padding:0">',
					'<h3>You have <span class="posBoxCountVal-to_schedule">', posList['to_schedule'].length,'</span>',
                      ' Positions listed as "To Schedule"</h3>',
					jld.pos.constructPosListHTML(posList['to_schedule'], 'to_schedule'),
				'</div>',
				'<div id="stepTab-5" style="padding:0">',
					'<h3>You have <span class="posBoxCountVal-interviewed">', posList['interviewed'].length,'</span>',
                      ' Positions listed as "Interviewed and Waiting"</h3>',
					jld.pos.constructPosListHTML(posList['interviewed'], 'interviewed'),
				'</div>',
				'<div id="stepTab-6" style="padding:0">',
					'<div id="closedTabs">',
                        '<ul style="background:none;border:0">',
                            '<li class="closedBtn ui-state-default nobutton"><a href="#closed-offer-tab">Got an Offer</a></li>',
                            '<li class="closedBtn ui-state-default nobutton"><a href="#closed-rejected-tab">Got Rejected</a></li>',
                            '<li class="closedBtn ui-state-default nobutton"><a href="#closed-not_interested-tab">Not interested</a></li>',
                        '</ul>',
                        '<div id="closed-offer-tab" style="padding:0">',
                            '<h3>You have <span class="posBoxCountVal-offered">', posList['offered'].length,'</span>',
                            ' Positions listed as "Offered"</h3>',
        					jld.pos.constructPosListHTML(posList['offered'], 'offered'),
                        '</div>',
                        '<div id="closed-rejected-tab" style="padding:0">',
                            '<h3>You have <span class="posBoxCountVal-rejected">', posList['rejected'].length,'</span>',
                            ' Positions listed as "Rejected"</h3>',
        					jld.pos.constructPosListHTML(posList['rejected'], 'rejected'),
                        '</div>',
                        '<div id="closed-not_interested-tab" style="padding:0">',
                            '<h3>You have <span class="posBoxCountVal-not_interested">', posList['not_interested'].length,'</span>',
                            ' Positions listed as "Not Interested"</h3>',
        					jld.pos.constructPosListHTML(posList['not_interested'], 'not_interested'),
                        '</div>',
                    '</div>',
				'</div>',
                '<div id="posMoveExpanded" style="z-index:110">');
    for (var i = 0; i < jld.pos.stepLabels.length; i++) {
      html.push('<button style="margin:2px 0" pstatus="', jld.pos.steps[i] ,'">', jld.pos.stepLabels[i], '</button>');
    }
    html.push(
              '</div>',
              '<div id="posMoveExpandedLayer" style="z-index:109"></div>',
			'</div>');
	return html.join('');
};

// innerHTML of a content inside create a new position tab.
jld.pos.plusBodyInnerHTML = [];
jld.pos.plusBodyInnerHTML.push(
	'<h3 style="margin-top:0">Create a New Position</h3>',
	'<div><input id="new_position_name" type="text" placeholder="Position Name"/></div>',
	'<div><textarea id="new_position_description" placeholder="Description"></textarea></div>',
	'<div><input id="new_position_company" type="text" placeholder="Company"/></div>',
	'<div><textarea id="new_position_comments" placeholder="Comments"></textarea></div>',
	'<div><input id="new_position_app_link" type="text" placeholder="Link to Application"/></div>',
	'<div><input id="new_position_app_due_date" type="text" class="lander_datepicker" placeholder="Application Due Date"/></div>',
	'<span class="actions">',
		'<input style="margin-top:15px" id="newPosBtn" type="button" value="Create a New Position">',
	'</span>');
jld.pos.plusBodyInnerHTML = jld.pos.plusBodyInnerHTML.join("");

// This function is called when a 'Create a New Position' button is hit.
jld.pos.createNewPosition = function(){
	var position = {};
	position.name = $(".jld #new_position_name").val();
	position.details = $(".jld #new_position_description").val();
	position.company = $(".jld #new_position_company").val();
	position.comments = $(".jld #new_position_comments").val();
	position.app_link = $(".jld #new_position_app_link").val();
	position.app_due_date = $(".jld #new_position_app_due_date").val();
	$.ajax({
		url:"http://joblander.herokuapp.com/users/1/positions.json",
		type:"POST",
		data:JSON.stringify(position),
		contentType:"application/json"
	});
	return false;
};

// A function to perform after the move-to-status button is clicked.
// posElemenet = a DIV element of position
// newStatus = a new status of this position to be set
jld.pos.movePosition = function(posElement, newStatus) {
    var pid = posElement.attr('pid');
    // TODO(baddth): Add error handler.
    $.ajax({
           url:'http://joblander.herokuapp.com/users/1/positions/' + pid + '.json',
           type:'put',
           data:JSON.stringify({'pstatus':newStatus}),
           contentType:"application/json",
           statusCode: {
            304: function() {
            }
           }
    });
    // update posBoxCount for current pstatus
    var currentStatus = posElement.parent('.positions').attr('id');
    if (currentStatus) {
        currentStatus = currentStatus.substring(4);
        var count = parseInt($('.jld .posBoxCountVal-' + currentStatus).html());
        $('.jld .posBoxCountVal-' + currentStatus).html(count-1);
        // update posBoxCount for currently Closed
        if (currentStatus == 'offered' || currentStatus == 'rejected' || currentStatus == 'not_interested') {
            var count = parseInt($('.jld .posBoxCountVal-closed').html());
            $('.jld .posBoxCountVal-closed').html(count-1);
        }
    }

    // Move posElement to the new step
    posElement.parent().remove(posElement);
    $('.jld #pos-' + newStatus).append(posElement);
    
    // Update posBoxCount for new pstatus
    var count = parseInt($('.jld .posBoxCountVal-' + newStatus).html());
    $('.jld .posBoxCountVal-' + newStatus).html(count+1);

    // update posBoxCount for newly Closed
    if (newStatus == 'offered' || newStatus == 'rejected' || newStatus == 'not_interested') {
        var count = parseInt($('.jld .posBoxCountVal-closed').html());
        $('.jld .posBoxCountVal-closed').html(count+1);
        jld.animate(255,$('.jld .stepBtn-closed' + ' .posBoxCount'));
    } else {
        // Start color animation on a new status number
        jld.animate(255,$('.jld .stepBtn-' + newStatus + ' .posBoxCount'));
    }
};

// This function is created to replace Jquery animate which doesn't support color animation yet
jld.animate = function(step,element) {
    if (step < 0) {
        return;
    }
    element.css('color', 'rgb(' + step + ',0,0)');
    setTimeout(function(){
               jld.animate(step-1, element);
    }, 1);
};

// A function to download positon list from server.
jld.pos.getServerPositions = function(callback) {
    // TODO(baddth): Add error handler.
	$.get(
		"http://joblander.herokuapp.com/users/1/positions.json",
		function(data) {
			callback(data);
		}
	);
}

// A function to run in the beginning of main.
jld.pos.init = function() {
	jld.pos.getServerPositions(function(data) {
		var posList = {};
        posList['to_apply'] = $.grep(data, function(pos) { return pos.pstatus === "to_apply";});
        posList['applied'] = $.grep(data, function(pos) { return pos.pstatus === "applied";});
        posList['to_schedule'] = $.grep(data, function(pos) { return pos.pstatus === "to_schedule";});
        posList['interviewed'] = $.grep(data, function(pos) { return pos.pstatus === "interviewed";});
        posList['offered'] = $.grep(data, function(pos) { return pos.pstatus === "offered";});
        posList['rejected'] = $.grep(data, function(pos) { return pos.pstatus === "rejected";});
        posList['not_interested'] = $.grep(data, function(pos) { return pos.pstatus === "not_interested";});
                               
		var body = jld.pos.constructStepTabsInnerHTML(posList);
		$(".jld #tabs-1").html(body);
		jld.pos.render();
	});
};

// A function to run after all elements are put into the widget.
jld.pos.render = function() {
    // Render Steps as tab buttons
	$('.jld #stepTabs').tabs({
		selected: -1,
		collapsible: true,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
    $('.jld #closedTabs').tabs({
        selected: 0,
        collapsible: false,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
    });
	$(".jld #newPosBtn,.jld .posBox").button();
    // Click event for Create a new Position button
	$(".jld #newPosBtn").click(jld.pos.createNewPosition);
    // Toggle Positon description expansion
	$(".jld .posTitle").click(function(){
		var parent = $(this).parent();
		if (!parent.hasClass("posExpand")){
			parent.addClass("posExpand");
		} else {
			parent.removeClass("posExpand");
		}
	});
    // Render the Move button inside Position
	$(".jld .posMoveBtn button").button();
    $(".jld #posMoveExpanded button").button();
    // Mouseover event of the Move button inside Position
	$(".jld .posMoveBtn").click(function(){
		var pid = $(this).parent('.pos').attr('pid');
        var fposition = $(this).offset();
		var element = $(".jld #posMoveExpanded");
        element.css('top', fposition.top+33);
        element.css('left', fposition.left-100);
        element.attr('pid', pid);
		element.animate({height: 'toggle',direction:'top',speed:'fast'});
        //element.css('display', 'block');
        element.css('position', 'fixed');
		var deselectLayer = $(".jld #posMoveExpandedLayer");
        deselectLayer.css('display', 'block');
	});
	// Hidden layer behind the float panel. This is to capture click outside panel
    $(".jld #posMoveExpandedLayer").click(function() {
        $(this).css('display', 'none');
		$(".jld #posMoveExpanded").css('display', 'none');
    });
	// Mouse event for the float panel for move-to-step
    $(".jld #posMoveExpanded button").click(function() {
		var pid = $(this).parent("#posMoveExpanded").attr('pid');
        var pos = $(".jld #pos" + pid);
        var pstatus = $(this).attr('pstatus');
        jld.pos.movePosition(pos, pstatus);
        $(".jld #posMoveExpandedLayer").click();
    });
	// Click event for delete button. This will trigger Confirm/Cancel button
	$(".jld .posDelBtn").click(function() {
		$(this).css('display','none');
		$(this).siblings(".jld .posDelExpanded").css('display','inline-block');
	});
	// Render delete confirm and cancel button
	$(".jld .posDelExpanded button").button();
	// Click event for cancel delete button
	$(".jld .posDelCancelBtn").click(function() {
		$(this).parent().siblings(".jld .posDelBtn").css('display','inline-block');
		$(this).parent().css('display','none');
	});
	// Click event for confirm delete button
	$(".jld .posDelConfirmBtn").click(function() {
		var pid = $(this).parents(".pos").attr('pid');
        $.ajax({
            url:"http://joblander.herokuapp.com/users/1/positions/" + pid + ".json",
            type:"delete",
            statusCode: {
                204: function() {

                }
            }
        });
        $(this).parents("#pos" + pid).remove();
    });
};