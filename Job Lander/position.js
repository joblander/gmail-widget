/* Position Management related code goes here. */
window.jld = window.jld || {};
window.jld.pos = {};

// innerHTML for tab buttons.
// TODO(baddth): Replace image url properly.
jld.pos.tabButtonsInnerHTML =
	'<li class="ui-corner-all"><a href="#tabs-1">Positions<span class="notify round">10</span></a></li>' +
	'<li style="border:0"><a href="#tabs-2" style="padding:0"><img src="//baddth.com/jld/images/plus-icon.png" style="vertical-align:middle"></a></li>';

// innerHTML of a content inside Process Box (To Review, To Apply, ..., etc).
jld.pos.stepBoxInnerHTML =
		'<b style="margin-left:208px">Active Positions</b>'+
		'<ul style="background:none;border:0">' +
		'<li class="stepBtn ui-state-default round">' +
			'<a href="#stepTab-1">To Review' +
				'<div class="posBoxCount round">10</div>' +
			'</a>' +
		'</li>' +
		'<li class="stepBtn ui-state-default">' +
			'<a href="#stepTab-2">To Apply' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="stepBtn ui-state-default">' +
			'<a href="#stepTab-3">Applied and Waiting' +
				'<div class="posBoxCount round">3</div>' +
			'</a>' +
		'</li>' +
		'<li class="stepBtn ui-state-default">' +
			'<a href="#stepTab-4">To Schedule' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="stepBtn ui-state-default" style="font-size:10px">' +
			'<a href="#stepTab-5">Interviewed and Waiting' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="stepBtn ui-state-default" style="font-size:10px;margin-left:10px">' +
			'<a href="#stepTab-6">Closed' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'</ul>' +
		'<div style="clear:both"></div>';

// innerHTML of a content inside Positions tab.
// TODO: Use data from server to create this.
jld.pos.taskBodyInnerHTML =
		'<div id="stepTabs" style="border:0;margin:0;padding:0">' +
			'<div id="stepBox" class="actions">' +
				jld.pos.stepBoxInnerHTML +
			'</div>' +
			'<div id="stepTab-1" style="padding:0">' +
				'<h3 style="text-align:left">' +
					'<a href="#" title="Change Search" onclick="return false">' +
						'Product Manager, San Francisco' +
						'<div class="round ui-state-default" style="display:inline-block;vertical-align:bottom;cursor:pointer;margin-left:5px">' +
							'<span class="ui-icon ui-icon-wrench" style="padding:1px"></span>' +
						'</div>' +
					'</a>' +
				'</h3>' +
				'<div class="positions">' +
					'<div class="pos">' +
						'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>' +
						'<div class="posTitle">Position from feed1</div>' +
						'<div class="posDetail">Description' +
						'</div>' +
					'</div>' +
					'<div class="pos">' +
						'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>' +
						'<div class="posTitle">Position from feed2</div>' +
						'<div class="posDetail">Description' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="stepTab-2" style="padding:0">' +
				'<h3>No Position listed as "To Apply"</h3>' +
			'</div>' +
			'<div id="stepTab-3" style="padding:0">' +
				'<h3>You have 3 Positions listed as "Applied and Waiting"</h3>' +
				'<div class="positions">' +
					'<div class="pos">' +
						'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>' +
						'<div class="posTitle">Product Manager at Google</div>' +
						'<div class="posDetail">' +
							'<div class="posDesc">The role: Product Marketing Manager. Consumer... Work closely with Product Managers, Engineers and User Experience teams to develop optimal product for ...</div>' +
							'<div class="posMail">' +
								'<div>Related Emails</div>' +
								'<div>' +
									'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>' +
									'<div style="display:inline-block"><a href="#inbox">Conformation Email. Thanks for your submission.</a></div>' +
									'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>' +
								'</div>' +
								'<div>' +
									'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>' +
									'<div style="display:inline-block"><a href="#inbox">Touchbase Email. Hello for recruiter.</a></div>' +
									'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>' +
								'</div>' +
							'</div>' +
							'<div class="posTask">' +
								'<div>Related Tasks</div>' +
								'<div>' +
									'<div class="posIcon"><span class="ui-icon ui-icon-link"></span></div>' +
									'<div style="display:inline-block"><a href="#inbox">Prepare an interview with recruiter</a></div>' +
									'<div class="posDg" style="margin-left:5px;vertical-align:bottom"><span class="ui-icon ui-icon-close"></span></div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="pos">' +
						'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>' +
						'<div class="posTitle">Product Manager at Facebook</div>' +
						'<div class="posDetail">Description' +
						'</div>' +
					'</div>' +
					'<div class="pos">' +
						'<div class="posDg"><span class="ui-icon ui-icon-star"></span></div>' +
						'<div class="posTitle">Product Manager at Apple</div>' +
						'<div class="posDetail">Description' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="stepTab-4" style="padding:0">' +
				'<h3>No Position listed as "To Schedule"</h3>' +
			'</div>' +
			'<div id="stepTab-5" style="padding:0">' +
				'<h3>No Position listed as "Interviewed and Waiting"</h3>' +
			'</div>' +
			'<div id="stepTab-6" style="padding:0">' +
				'<h3>Under Construction</h3>' +
			'</div>' +
		'</div>';

// innerHTML of a content inside create a new position tab.
jld.pos.plusBodyInnerHTML =
	'<h3 style="margin-top:0">Create a New Position</h3>' +
	'<div><input id="new_position_name" type="text" placeholder="Position Name"/></div>' +
	'<div><textarea id="new_position_description" placeholder="Description"></textarea></div>' +
	'<div><input id="new_position_company" type="text" placeholder="Company"/></div>' +
	'<div><textarea id="new_position_comments" placeholder="Comments"></textarea></div>' +
	'<div><input id="new_position_app_link" type="text" placeholder="Link to Application"/></div>' +
	'<div><input id="new_position_app_due_date" type="text" class="lander_datepicker" placeholder="Application Due Date"/></div>' +
	'<span class="actions">' +
		'<input style="margin-top:15px" id="newPosBtn" type="button" value="Create a New Position">' +
	'</span>';

// A function to run in the beginning of main.
jld.pos.init = function() {
	// TODO: Load user's positions from the server and initize tabBodyInnerHTML.
}

// A function to run after all elements are put into the widget.
jld.pos.render = function() {
	$('#stepTabs').tabs({
		selected: -1,
		collapsible: true,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
	$("#newPosBtn,.posBox").button();
	$("#newPosBtn").click(jld.pos.createNewPosition);
	$(".pos").click(function(){
		if (!$(this).hasClass("posExpand")){
			$(this).addClass("posExpand");
		} else {
			$(this).removeClass("posExpand");
		}
	});
	$(".posDetail").click(function(){
		event.stopPropagation();
	});

	// TODO(baddth): Check with Trenton about this.
    //TODO: Make .lander_datepicker class elements pop out a datepicker. Not sure why the following code doesn't work:
    //$(".lander_datepicker", frame).datepicker();
    //That code doesn't work if left right there. If, instead, I run that statement in the Console after the page is up, it does work.
    //$(".ui-tabs .ui-tabs-panel", frame).css({'padding-bottom':'0em'});

	// TODO(baddth): Add Close Position back into UI.
	/*$("#tabs-min", frame).tabs({ collapsible: true, selected: -1 });
    $("#closed_positions", frame).click(function() {
      var div = $("#closed_expanded", frame);
      if (div.is(":visible")) { div.hide(); } 
      else { div.show(); }
    });
    $(".closed_item_header", frame).click(function() {
      var head = $(this);
      var desc = head.next();
      if (desc.is(":visible")) { desc.hide(); head.css('font-weight','normal'); } // I should probably change these to toggleable classes
      else { desc.show(); head.css('font-weight','bold'); }
    });*/
}

// This function is called when a 'Create a New Position' button is hit.
jld.pos.createNewPosition = function(){
	var position = {};
	position.name = $("#new_position_name").val();
	position.details = {};
	position.details.description = $("#new_position_description").val();
	position.details.company = $("#new_position_company").val();
	position.details.comments = $("#new_position_comments").val();
	position.details.app_link = $("#new_position_app_link").val();
	position.details.app_due_date = $("#new_position_app_due_date").val();
	$.ajax({
		url:"http://joblander.herokuapp.com/users/1/positions.json",
		type:"POST",
		data:JSON.stringify(position),
		contentType:"application/json"
	});
	return false;
};