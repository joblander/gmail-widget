/* Setting related code goes here. */
window.jld = window.jld || {};
window.jld.setting = {};

// innerHTML for tab buttons.
// TODO(baddth): Replace image url properly.
jld.setting.tabButtonsInnerHTML =
	'<li style="border:0"><a href="#tabs-5" style="padding:0"><span class="ui-icon ui-icon-wrench"></span></li>';

// innerHTML of a content inside Setting tab.
// TODO: Use data from server to create this.
jld.setting.settingBodyInnerHTML =
	'<h3 style="margin:0 0 1em 30px">Change setting</h3>' +
	'<div id="setting">Pending bigger setting icon and content' +
	'</div>';

// A function to run in the beginning of main.
jld.setting.init = function() {
	// TODO: Load user's setting from the server and initize tabBodyInnerHTML.
}

// A function to run after all elements are put into the widget.
jld.setting.render = function() {
}
// add more function below