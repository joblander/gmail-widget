/* Position Management related code goes here. */
window.jld = window.jld || {};
window.jld.pos = {};

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
	'<li style="border:0"><a href="#tabs-2" style="padding:0"><img src="//baddth.com/jld/images/plus-icon.png" style="vertical-align:middle"></a></li>'
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
			'<li class="stepBtn ui-state-default">',
				'<a href="#stepTab-2">To Apply',
					'<div class="posBoxCount round">', posList['to_apply'].length,'</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn ui-state-default">',
				'<a href="#stepTab-3">Applied and Waiting',
					'<div class="posBoxCount round">0</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn ui-state-default">',
				'<a href="#stepTab-4">To Schedule',
					'<div class="posBoxCount round">0</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn ui-state-default" style="font-size:10px">',
				'<a href="#stepTab-5">Interviewed and Waiting',
					'<div class="posBoxCount round">0</div>',
				'</a>',
			'</li>',
			'<li class="stepBtn ui-state-default" style="font-size:10px;margin-left:10px">',
				'<a href="#stepTab-6">Closed',
					'<div class="posBoxCount round">0</div>',
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
			'<div class="posTitle">', pos.name,'</div>',
			'<div class="posMoveBtn"><button>Move <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-w"></span></button>',
				'<div class="posMoveExpanded">',
					'<button style="margin:2px 0">To Apply</button>',
					'<button style="margin:2px 0">Applied and Waiting</button>',
					'<button style="margin:2px 0">To Schedule</button>',
					'<button style="margin:2px 0">Interviewed and Waiting</button>',
					'<button style="margin:2px 0">Closed - got an offer</button>',
					'<button style="margin:2px 0">Closed - got rejected</button>',
					'<button style="margin:2px 0">Closed - not interested</button>',
				'</div>',
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
jld.pos.constructPosListHTML = function(positions) {
	var html = ['<div class="positions">'];
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
				'<div id="stepTab-2" style="padding:0">',
					'<h3>You have ', posList['to_apply'].length,' Positions listed as "To Apply"</h3>',
					jld.pos.constructPosListHTML(posList['to_apply']),
				'</div>',
				'<div id="stepTab-3" style="padding:0">',
					'<h3>You have 0 Positions listed as "Applied and Waiting"</h3>',
				'</div>',
				'<div id="stepTab-4" style="padding:0">',
					'<h3>No Position listed as "To Schedule"</h3>',
				'</div>',
				'<div id="stepTab-5" style="padding:0">',
					'<h3>No Position listed as "Interviewed and Waiting"</h3>',
				'</div>',
				'<div id="stepTab-6" style="padding:0">',
					'<h3>Under Construction</h3>',
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

jld.pos.getServerPositions = function(callback) {
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
		var body = jld.pos.constructStepTabsInnerHTML(posList);
		$(".jld #tabs-1").html(body);
		jld.pos.render();
	});
};

// A function to run after all elements are put into the widget.
jld.pos.render = function() {
	$('.jld #stepTabs').tabs({
		selected: -1,
		collapsible: true,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
	$(".jld #newPosBtn,.jld .posBox").button();
	$(".jld #newPosBtn").click(jld.pos.createNewPosition);
	$(".jld .posTitle").click(function(){
		var parent = $(this).parent();
		if (!parent.hasClass("posExpand")){
			parent.addClass("posExpand");
		} else {
			parent.removeClass("posExpand");
		}
	});
	$(".jld .posMoveBtn button").button();
	$(".jld .posMoveBtn").mouseover(function(){
		var pid = $(this).parent().attr('pid');
		var element = $(".jld #pos" + pid + " .posMoveExpanded");
		element.css('display', 'block');
	});
	$(".jld .posMoveBtn").mouseout(function(){
		console.log('mouseout');
		var pid = $(this).parent().attr('pid');
		$(".jld #pos" + pid + " .posMoveExpanded").css('display', 'none');
	});
};