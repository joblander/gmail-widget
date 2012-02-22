/* Task Management related code goes here. */
window.jld = window.jld || {};
window.jld.task = {};

// innerHTML for tab buttons.
// TODO(baddth): Replace image url properly.
jld.task.tabButtonsInnerHTML =
	'<li class="ui-corner-all" style="margin-left:10px"><a href="#tabs-3">Tasks<span class="notify round">3</span></a></li>' +
	'<li style="border:0"><a href="#tabs-4" style="padding:0"><img src="//baddth.com/jld/images/plus-icon.png" style="vertical-align:middle"></a></li>';

// innerHTML of a content inside Tasks tab.
// TODO: Use data from server to create this.
jld.task.taskBodyInnerHTML =
	'<h3 style="margin:0 0 1em 30px">You have 3 Tasks to finish</h3>' +
	'<div id="tasks">' +
		'<div class="task"><div class="taskDg"><span class="ui-icon ui-icon ui-icon-arrow-4"></span></div>Task 1</div>' +
		'<div class="task"><div class="taskDg"><span class="ui-icon ui-icon ui-icon-arrow-4"></span></div>Task 2</div>' +
		'<div class="task"><div class="taskDg"><span class="ui-icon ui-icon ui-icon-arrow-4"></span></div>Task 3</div>' +
	'</div>';

// innerHTML of a content inside create a new task tab.
jld.task.plusBodyInnerHTML =
	'<h3 style="margin-top:0">Create a New Task</h3>' +
	'<input type="text" placeholder="Task Name"/>' +
	'<textarea placeholder="Description"></textarea>' +
	'<input type="text" class="lander_datepicker" placeholder="Due Date"/>' +
	'<span class="actions">' +
		'<input style="margin-top:15px" id="newTaskBtn" type="submit" value="Create a New Task">' +
	'</span>';

// A function to run in the beginning of main.
jld.task.init = function() {
	// TODO: Load user's tasks from the server and initize tabBodyInnerHTML.
}

// A function to run after all elements are put into the widget.
jld.task.render = function() {
	$('#tasks').sortable({ handle: '.taskDg' });
	$("#newTaskBtn").button();
}
// add more function below