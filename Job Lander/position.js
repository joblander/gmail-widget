/* Position Management related code goes here. */
window.jld = window.jld || {};
window.jld.pos = {};

// innerHTML for tab buttons.
// TODO(baddth): Replace image url properly.
jld.pos.tabButtonsInnerHTML =
	'<li class="ui-corner-all"><a href="#tabs-1">Positions<span class="notify round">10</span></a></li>' +
	'<li style="border:0"><a href="#tabs-2" style="padding:0"><img src="//baddth.com/jld/images/plus-icon.png" style="vertical-align:middle"></a></li>';

// innerHTML of a content inside Process Box (To Review, To Apply, ..., etc).
jld.pos.processBoxInnerHTML =
		'<ul style="background:none;border:0">' +
		'<li class="processBtn ui-state-default round">' +
			'<a href="#processTab-1">To Review' +
				'<div class="posBoxCount round">10</div>' +
			'</a>' +
		'</li>' +
		'<li class="processBtn ui-state-default">' +
			'<a href="#processTab-2">To Apply' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="processBtn ui-state-default">' +
			'<a href="#processTab-3">Applied and Waiting' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="processBtn ui-state-default">' +
			'<a href="#processTab-4">To Schedule' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'<li class="processBtn ui-state-default" style="font-size:10px">' +
			'<a href="#processTab-5">Interviewed and Waiting' +
				'<div class="posBoxCount round">0</div>' +
			'</a>' +
		'</li>' +
		'</ul>' +
		'<div style="clear:both"></div>';

// innerHTML of a content inside Positions tab.
// TODO: Use data from server to create this.
jld.pos.taskBodyInnerHTML =
		'<h3 style="margin-left:1.4em;margin-top:0">' +
			'<a href="#" title="Change Search" onclick="return false">' +
				'Product Manager, San Francisco' +
				'<div class="round ui-state-default" style="display:inline-block;vertical-align:bottom;cursor:pointer">' +
					'<span class="ui-icon ui-icon-wrench" style="padding:1px"></span>' +
				'</div>' +
			'</a>' +
		'</h3>' +
		'<div id="processTabs" style="border:0;margin:0;padding:0">' +
			'<div id="processBox" class="actions">' +
				jld.pos.processBoxInnerHTML +
			'</div>' +
			'<div id="processTab-1" style="padding:0">' +
				'<div class="positions">' +
					'<div class="pos"><div class="posDg"><span class="ui-icon ui-icon-star"></span></div>Software Engineer at Google</div>' +
					'<div class="pos"><div class="posDg"><span class="ui-icon ui-icon-star"></span></div>Software Engineer at Facebook</div>' +
					'<div class="pos"><div class="posDg"><span class="ui-icon ui-icon-star"></span></div>Software Engineer at Apple</div>' +
				'</div>' +
			'</div>' +
			'<div id="processTab-2" style="padding:0">' +
				'<h3>No Position listed as "To Apply"</h3>' +
			'</div>' +
			'<div id="processTab-3" style="padding:0">' +
				'<h3>No Position listed as "Applied and Wating"</h3>' +
			'</div>' +
			'<div id="processTab-4" style="padding:0">' +
				'<h3>No Position listed as "To Schedule"</h3>' +
			'</div>' +
			'<div id="processTab-5" style="padding:0">' +
				'<h3>No Position listed as "Interviewed and Waiting"</h3>' +
			'</div>' +
		'</div>';

// innerHTML of a content inside create a new position tab.
jld.pos.plusBodyInnerHTML =
	'<h3 style="margin-top:0">Create a New Position</h3>' +
	'<input id="new_position_name" type="text" placeholder="Position Name"/>' +
	'<textarea id="new_position_description" placeholder="Description"></textarea>' +
	'<input id="new_position_company" type="text" placeholder="Company"/>' +
	'<textarea id="new_position_comments" placeholder="Comments"></textarea>' +
	'<input id="new_position_app_link" type="text" placeholder="Link to Application"/>' +
	'<input id="new_position_app_due_date" type="text" class="lander_datepicker" placeholder="Application Due Date"/>' +
	'<span class="actions">' +
		'<input style="margin-top:15px" id="newPosBtn" type="button" value="Create a New Position">' +
	'</span>';

// A function to run in the beginning of main.
jld.pos.init = function() {
	// TODO: Load user's positions from the server and initize tabBodyInnerHTML.
  jld.pos.getAllPositions();
}

// A function to run after all elements are put into the widget.
jld.pos.render = function() {
	$('#processTabs').tabs({
		selected: 0,
		collapsible: false,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
	$("#newPosBtn,.posBox").button();
	$("#newPosBtn").click(jld.pos.createNewPosition);
  $(".lander_datepicker").datepicker();
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

// This function is called to get all positions button is hit.
jld.pos.getAllPositions = function(){
	var positions = {};
	$.get("http://joblander.herokuapp.com/users/1/positions.json", function(data) {
    window.result = JSON.parse(data, function);
    alert("done");
  });
	return false;
};