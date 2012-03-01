// Job Lander 

(function() {

  floatWidgetInnerHTML = [];
  floatWidgetInnerHTML.push(
	'<div class="jld">',
		'<div id="lander_widget" class="ui-tabs ui-widget ui-widget-content ui-corner-all" style="position:fixed;top:74px;right:100px">',
			'<ul class="lander_menu" style="border:0;padding:0;position:relative">',
				jld.pos.tabButtonsInnerHTML,
				jld.task.tabButtonsInnerHTML,
				jld.setting.tabButtonsInnerHTML,
				'<div id="lander_handle"></div>',
			'</ul>',
			'<div id="tabs-1" style="padding-left:0;padding-right:0">',
			'</div>',
			'<div id="tabs-2">',
				jld.pos.plusBodyInnerHTML,
			'</div>',
			'<div id="tabs-3" style="padding-left:0;padding-right:0">',
				jld.task.taskBodyInnerHTML,
			'</div>',
			'<div id="tabs-4">',
				jld.task.plusBodyInnerHTML,
			'</div>',
            '<div id="tabs-5">',
                jld.setting.settingBodyInnerHTML,
            '</div>',
		'</div>',
    '</div>');
  floatWidgetInnerHTML = floatWidgetInnerHTML.join('');

  // Can be executed only when all resources are loaded.
  main = function() {
	if (top != self) {
      // Do not execute duplicate code inside children frames
	  return;
	}
	// Create a float widget.
	var floatWidget = document.createElement('div');
	$(floatWidget).html(floatWidgetInnerHTML);
	// Append float widget into the document.
	document.body.appendChild(floatWidget);
	// Render widget
	jld.task.render();
    $('#lander_widget').draggable({ iframeFix: true, containment: "document", handle: "#lander_handle" });
	$('#lander_widget').tabs({
		selected: -1,
		collapsible: true,
		fx: [{ opacity: 'toggle', duration: 'fast' },{ height: 'toggle', duration: 'fast' }]
	});
	$("button").button();
    jld.task.init();
	jld.pos.init();
  }

  $(function() {
	// Use Jquery to register hash change event.
    $(window).bind( 'hashchange', function(e) {
      jld.inmailWidget.tryEmbedinmailWidget();
	});
	jld.inmailWidget.tryEmbedinmailWidget();
    main();
  });

}());