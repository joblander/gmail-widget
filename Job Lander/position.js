/* Position Management related code goes here. */
window.jld = window.jld || {};
window.jld.pos = {};
window.jld.feed = {};
window.jld.feed.idGenerator = 0;
window.jld.pos.steps = ['to_review','to_apply','applied','to_schedule','interviewed','offered','rejected','not_interested'];
window.jld.pos.stepLabels = ['To Review','To Apply','Applied and Waiting','To Schedule','Interviewed and Waiting','Closed - got an offer','Closed - got rejected','Closed - not interested'];
window.jld.pos.stepIndex = {'to_review':0,'to_apply':1,'applied':2,'to_schedule':3,'interviewed':4,'offered':5,'rejected':6,'not_interested':7};

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

// Elements that are shared by other pages. These will be populated at the root element level.
jld.pos.rootInnerHTML = [];
jld.pos.rootInnerHTML.push(
	'<div id="posMoveExpanded" style="z-index:110">');
for (var i = 1; i < jld.pos.stepLabels.length; i++) {
    jld.pos.rootInnerHTML.push('<button class="pstatus', jld.pos.steps[i] ,'" style="margin:2px 0" sid="',i,'" pstatus="', jld.pos.steps[i] ,'">',
		jld.pos.stepLabels[i], '</button>');
}
jld.pos.rootInnerHTML.push(
	'</div>',
	'<div id="posMoveExpandedLayer" style="z-index:109"></div>');
jld.pos.rootInnerHTML = jld.pos.rootInnerHTML.join("");

// innerHTML of a content inside Process Box (To Review, To Apply, ..., etc).
jld.pos.constructStepBoxInnerHTML = function(posList) {
	var html = [];
	html.push(
			'<b style="margin-left:208px">Active Positions</b>',
			'<ul style="background:none;border:0">',
			'<li class="stepBtn ui-state-default round">',
				'<a href="#stepTab-1">To Review',
					'<div class="posBoxCount round">', posList['to_review'].length,'</div>',
				'</a>',
			'</li>',
            // TODO(baddth): don't hard code to_apply and all status string here.
            // use jld.pos.steps instead.
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
jld.pos.constructPosHTML = function(pos,pstatus){
    var isFeed = (pstatus == jld.pos.steps[0]);
    var itemtype = 'pos';
    var attr = 'pid';
    var buttonLabel = 'Move';
    if (isFeed) {
        itemtype = 'feed';
        attr = 'fid';
        buttonLabel = 'Create';
    }
	var html = [];
    var id = pos.id;
    if (isFeed) {
        id = ++jld.feed.idGenerator;
    }
	html.push(
		'<div class="', itemtype,'" id="', itemtype, id,'" ',attr,'="', id,'">');
    if (!isFeed) {
        if (pos.starred)
        { // Active star
            html.push(
                      '<div class="posDgActive"><span class="ui-icon ui-icon-star"></span></div>');
        } else {
            // Inactive star
            html.push(
                      '<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>');
        }
    } else {
        // todo(baddth): implement star
        html.push(
                  '<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>');
    }
    if (!isFeed) {
        html.push(
                  '<div class="posTitle">', pos.name, '</div>');
    } else {
        html.push(
                  '<div class="posTitle"><a href="' + pos.app_link + '" target="_blank" style="color:blue;text-decoration:underline">', pos.name, ' at ' + pos.company + '</a></div>');
    }
    html.push(
    '<div class="posMoveBtn dsplyMove"><button>Move <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></button>',
    '</div>');
    if (!isFeed) {
        html.push(
			'<div class="posDg posDelBtn" style="vertical-align:bottom;margin-left:5px">',
				'<span class="ui-button-icon-primary ui-icon ui-icon ui-icon-close"></span>',
			'</div>',
			'<div class="posDelExpanded" style="display:none">',
				'<button class="posDelConfirmBtn" style="margin: 0 0 0 10px">Delete</button>',
				'<button class="posDelCancelBtn" style="margin: 0 0 0 5px">Cancel</button>',
			'</div>',
			'<div class="posEmailBtn dsplyAttachment"><button>Attach to Email</button>',
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
			'</div>');
    }
    html.push(
        '</div>');
	return html.join('');
};

// Construct an innerHTML for a group of positions
// positions = array of positions
// pstatus = Position status of this group of positions.
jld.pos.constructPosListHTML = function(positions, pstatus) {
	var html = ['<div class="positions" id="pos-'+pstatus+'">'];
	for (var i = 0; i < positions.length; i++) {
		html.push(jld.pos.constructPosHTML(positions[i], pstatus));
	}
    // TODO(baddth): delete this and show the spinner only when the scroll hit bottom.
    if (pstatus == 'to_review'){
        html.push('<div style="text-align:center;background:#fff">');
        html.push(  '<img src="//baddth.com/jld/images/loading.gif"/><br/> Loading more result');
        html.push(  ' <br/><span>Under construction</span>');
        html.push('</div>');
    }
	html.push('</div>');
	return html.join('');
};

// innerHTML of a content inside Positions tab.
jld.pos.constructStepTabsInnerHTML = function(posList) {
	var html = [];
	html.push(
            '<div style="background-color:blue" class="dsplyAttachment">',
              'Choose Position to attach with email. // Pending nicer css here',
            '</div>',
			'<div id="stepTabs" style="border:0;margin:0;padding:0">',
				'<div id="stepBox" class="actions">',
					jld.pos.constructStepBoxInnerHTML(posList),
				'</div>',
				'<div id="stepTab-1" style="padding:0">',
					'<h3 style="text-align:left">',
						'<a href="#" title="Change Search" class="settingLink">',
							'<span>Product Manager, San Francisco</span>',
                            ' (<span style="font-size:12px;color:blue;text-decoration:underline">Change Search</span>)',
							'<div class="round ui-state-default" style="display:inline-block;vertical-align:bottom;cursor:pointer;margin-left:5px">',
								'<!--span class="ui-icon ui-icon-wrench" style="padding:1px"></span-->',
							'</div>',
						'</a>',
					'</h3>',
					jld.pos.constructPosListHTML(posList['to_review'], 'to_review'),
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
                '<div style="background-color:blue" class="dsplyAttachment navBar">',
                  '<button class="backButton">Back</button> Pending nicer css here',
                '</div>',
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
	'<div>',
		'<span>Current Status </span><div class="posMoveBtn" style="display:inline-block" sid="1" pstatus="to_apply"><button style="margin-left:5px"><span class="label">To Apply</span> <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span></button></div>',
	'</div>',
    '<div id="new_position_email"></div>',
	'<span class="actions">',
		'<input style="margin-top:15px" id="newPosBtn" type="button" value="Create a New Position">',
	'</span>',
	'<div class="confirmMessage"></div>');
jld.pos.plusBodyInnerHTML = jld.pos.plusBodyInnerHTML.join("");

// This function is called when a 'Create a New Position' button is hit.
jld.pos.formNewPosition = function(){
	if ($(".jld #new_position_name").val() == '') {
		$(".jld #tabs-2 .confirmMessage").html('Position name is a required');
		return;
	}
	var position = {};
	position.name = $(".jld #new_position_name").val();
	position.details = $(".jld #new_position_description").val();
	position.company = $(".jld #new_position_company").val();
	position.comments = $(".jld #new_position_comments").val();
	position.app_link = $(".jld #new_position_app_link").val();
	position.app_due_date = $(".jld #new_position_app_due_date").val();
	var newStatus = $(".jld #tabs-2 .posMoveBtn").attr('pstatus');
	position.pstatus = newStatus;
//	var sid = parseInt($(".jld #tabs-2 .posMoveBtn").attr('sid'));
    jld.pos.createNewPosition(position);
};

jld.pos.createNewPosition = function(position){
    $.ajax({
        url:"http://joblander.herokuapp.com/users/1/positions.json",
        type:"POST",
        data:JSON.stringify(position),
        contentType:"application/json",
        success: function(data, textStatus, jqXHR){
           position.id = data.id;
           jld.pos.createNewPosition_success(data);
        },
        error: function(){
           jld.pos.createNewPosition_error();
        }
    });
};

// This function is called after server successfully created a new position
jld.pos.createNewPosition_success = function(position){
    var pid = position.id;
    var sid = jld.pos.stepIndex[position.pstatus];
	var posElement = jld.pos.constructPosHTML(position, position.pstatus);
    $('.jld #pos-' + position.pstatus).append(posElement);
	jld.pos.renderPosition(".jld #pos" + pid);
	$(".jld #new_position_name").val('');
	$(".jld #new_position_description").val('');
	$(".jld #new_position_company").val('');
	$(".jld #new_position_comments").val('');
	$(".jld #new_position_app_link").val('');
	$(".jld #new_position_app_due_date").val('');
	$(".jld #new_position_app_due_date").val('');
    $(".jld #new_position_email").html('');
	$(".jld #tabs-2 .confirmMessage").html('Position was added successfully and marked as ' +
		'<a href="#" id="linkToStep" style="color:blue;text-decoration:underline">' + jld.pos.stepLabels[sid] + '</a>');
	$(".jld #linkToStep").click(function(){
		if ($('.jld #lander_widget').tabs().tabs('option', 'selected') != 0) {
		    $('.jld #lander_widget').tabs('select', 0);
		}
		if ($('.jld #stepTabs').tabs().tabs('option', 'selected') != sid) {
			$('.jld #stepTabs').tabs('select', sid);
		}
		return false;
	});
};

jld.pos.createNewPosition_error = function(){
	$(".jld #tabs-2 .confirmMessage").html('Error occured. Please try again later');
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

// A function to perform after the star button is clicked.
// starElemenet = a DIV element of the star that triggered a click event
jld.pos.toggleStar = function(starElement) {
    var pid = starElement.parents(".pos").attr('pid');
	var posDg = starElement.parent(".posDg");
	var posDgActive = starElement.parent(".posDgActive");
	if (posDg.length > 0) {
		// Add Star
		// TODO(baddth): Add error handler.
		$.ajax({
			   url:'http://joblander.herokuapp.com/users/1/positions/' + pid + '.json',
			   type:'put',
			   data:JSON.stringify({'starred':true}),
			   contentType:"application/json",
			   statusCode: {
				204: function() {
				}
			   }
		});
		posDg.removeClass("posDg");
		posDg.addClass("posDgActive");
	} else
	if (posDgActive.length > 0) {
		// Remove Star
		// TODO(baddth): Add error handler.
		$.ajax({
			   url:'http://joblander.herokuapp.com/users/1/positions/' + pid + '.json',
			   type:'put',
			   data:JSON.stringify({'starred':false}),
			   contentType:"application/json",
			   statusCode: {
				204: function() {
				}
			   }
		});
		posDgActive.removeClass("posDgActive");
		posDgActive.addClass("posDg");
	}
}

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
    var posList = {};
	jld.pos.getServerPositions(function(data) {
        posList['to_apply'] = $.grep(data, function(pos) { return pos.pstatus === "to_apply";});
        posList['applied'] = $.grep(data, function(pos) { return pos.pstatus === "applied";});
        posList['to_schedule'] = $.grep(data, function(pos) { return pos.pstatus === "to_schedule";});
        posList['interviewed'] = $.grep(data, function(pos) { return pos.pstatus === "interviewed";});
        posList['offered'] = $.grep(data, function(pos) { return pos.pstatus === "offered";});
        posList['rejected'] = $.grep(data, function(pos) { return pos.pstatus === "rejected";});
        posList['not_interested'] = $.grep(data, function(pos) { return pos.pstatus === "not_interested";});
        jld.pos.initAfterGotAllData(posList);
	});
    jld.toreview.getToReviewFeed(function(data) {
        posList['to_review'] = data;
        jld.pos.initAfterGotAllData(posList);
    });
};

jld.pos.initAfterGotAllData = function(posList) {
    // if two ajax requests haven't filled the result yet, return for now.
    if (!posList['to_review'] || !posList['to_apply']) {
        return;
    }
    var body = jld.pos.constructStepTabsInnerHTML(posList);
    $(".jld #tabs-1").html(body);
    jld.pos.render();    
};

// Bind all Position related event into all positions under the prefix
// prefix = a jquery prefix for positions to get binded with the event
jld.pos.renderPosition = function(prefix) {
    // Toggle Positon description expansion
	$(prefix + " .posTitle").click(function(){
		var parent = $(this).parent();
		if (!parent.hasClass("posExpand")){
			parent.addClass("posExpand");
		} else {
			parent.removeClass("posExpand");
		}
	});
    // Render the Move button inside Position
	$(prefix + " .posMoveBtn button").button();
	$(prefix + " .posEmailBtn button").button();
    $(prefix + " #posMoveExpanded button").button();
    
	// StepSelector in Position
	$(prefix + " .posMoveBtn").click(function(){
		jld.pos.showMoveExpanded($(this),33,-100);
		var pid = $(this).parent('.pos').attr('pid');
		var element = $(".jld #posMoveExpanded");
        element.attr('pid', pid);
		// Mouse event for the float panel for move-to-step
		$(".jld #posMoveExpanded button").click(function() {
			var pid = $(this).parent("#posMoveExpanded").attr('pid');
			var pos = $(".jld #pos" + pid);
			var pstatus = $(this).attr('pstatus');
			jld.pos.movePosition(pos, pstatus);
			$(".jld #posMoveExpandedLayer").click();
		});
	});
	// Click event for delete button. This will trigger Confirm/Cancel button
	$(prefix + " .posDelBtn").click(function() {
		$(this).css('display','none');
		$(this).siblings(".jld .posDelExpanded").css('display','inline-block');
	});
	// Render delete confirm and cancel button
	$(prefix + " .posDelExpanded button").button();
	// Click event for cancel delete button
	$(prefix + " .posDelCancelBtn").click(function() {
		$(this).parent().siblings(".jld .posDelBtn").css('display','inline-block');
		$(this).parent().css('display','none');
	});
	// Click event for confirm delete button
	$(prefix + " .posDelConfirmBtn").click(function() {
		var pid = $(this).parents(".pos").attr('pid');
		console.log('delete ' + pid);
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
	// Click event for star button
	$(prefix + " .ui-icon-star").click(function() {
		jld.pos.toggleStar($(this));
	});
}

// A function to trigger an expanded steps for StepSelector button
jld.pos.showMoveExpanded = function(handler,offsetTop,offsetLeft) {
	var fposition = handler.offset();
	var element = $(".jld #posMoveExpanded");
	element.css('top', fposition.top+offsetTop);
	element.css('left', fposition.left+offsetLeft);
	element.animate({height: 'toggle',direction:'top',speed:'fast'});
	element.css('position', 'fixed');
	var deselectLayer = $(".jld #posMoveExpandedLayer");
	deselectLayer.css('display', 'block');
};

// Add related email
jld.pos.addRelatedEmail = function(){
  // Get the ID of the existing position to add the email to.
  var pid = $(this).parents(".pos").attr("pid");
  
  // Get the ID of the email to add.
  var hash= window.location.hash;
  var guid = hash.substring(hash.lastIndexOf('/')+1);
  
  var data = {};
  data.guid = guid;
  $.ajax({
    url:"http://joblander.herokuapp.com/users/1/positions/"+pid+"/related_emails.json",
    type:"POST",
    data:JSON.stringify(data),
    contentType:"application/json",
    success: function(data, textStatus, jqXHR){
       jld.pos.addRelatedEmail_success(data);
    },
    error: function(){
       jld.pos.addRelatedEmail_error();
    }
  });
}

jld.pos.addRelatedEmail_success = function(data){
  alert("Successfully attached related email. This notification will change from a pop up soon. The related email doesn't show up in the widget anywhere yet, but trust me: it's saved on the server.");
}

jld.pos.addRelatedEmail_error = function(){
  alert("Error");
}


// A function to run after all elements are put into the widget.
jld.pos.render = function() {
    // Render steps as tab
	$('.jld #stepTabs').tabs({
		selected: -1,
		collapsible: true,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
	// Render Closed-related steps as tab
    $('.jld #closedTabs').tabs({
        selected: 0,
        collapsible: false,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
    });
	$(".jld #newPosBtn,.jld .posBox").button();
    // Click event for Create a new Position button
	$(".jld #newPosBtn").click(jld.pos.formNewPosition);
	// Render positions and its event to all positions under .jld  .pos
	jld.pos.renderPosition(".jld .pos");
	// Render feeds and its event to all positions under .jld .feed
	jld.toreview.renderFeed(".jld .feed");
	// StepSelector in Create new Position tab
	$(".jld #tabs-2 .posMoveBtn").click(function(){
		var handler = $(this);
		jld.pos.showMoveExpanded($(this),33,-12);
		// Mouse event for the float panel for create a position
		$(".jld #posMoveExpanded button").click(function() {
			var sid = $(this).attr('sid');
			handler.attr('sid', sid);
			handler.attr('pstatus',window.jld.pos.steps[sid]);
			handler.find('.label').html(window.jld.pos.stepLabels[sid]);
			$(".jld #posMoveExpandedLayer").click();
		});
	});
  
  // Register click event for attaching a related email.
  $(".jld .posEmailBtn.dsplyAttachment button").live('click', jld.pos.addRelatedEmail);
  
	// Hidden layer behind the float panel. This is to capture click outside panel
    $(".jld #posMoveExpandedLayer").click(function() {
        $(this).css('display', 'none');
		$(".jld #posMoveExpanded").css('display', 'none');
    });
    $(".jld .navBar .backButton").click(function() {
        $('.jld #tabs-1').removeClass('attachment');
    });
    $(".jld .settingLink").click(function(){
        $('.jld #lander_widget').tabs('select', 4);
    });
};