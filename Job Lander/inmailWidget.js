/* Inline Widget related code goes here. */
window.jld = window.jld || {};
window.jld.inmailWidget = {};

jld.inmailWidget.tryEmbedinmailWidget = function() {
  var canvas_frame = document.getElementById('canvas_frame');
  if (!canvas_frame || !canvas_frame.contentDocument)
  {
    return; // No document found.
  }
  var canvas_doc = canvas_frame.contentDocument;
  var hashval = window.location.hash.split('/');
  if (hashval.length < 2){
    return; // Hash value doesn not has an email ID.
  }
  var title_spans = canvas_doc.getElementsByClassName('hP');
  if (title_spans.length < 1) {
    return; // Could not find a title
  }
  var title = title_spans[0].innerHTML;
  var header_spans = canvas_doc.getElementsByClassName('ha');
  if (header_spans.length < 1) {
    return; // Could not find a header span
  }
  var inmailWidget = canvas_doc.createElement('div');
  inmailWidget.className = 'jld';
  // Create Convert-to-a-New-Position Button
  var convertButton = $(
	  "<button style='font-size:12px'>Convert to a New Position</button>");
  var moreConvertButton = $(
	  "<button style='font-size:12px'>Convert to a New Task</button>");
  moreConvertButton.button({text:false,icons: {primary: "ui-icon-triangle-1-s"}});
  var convertButtonGroup = $("<div style='display:inline-block'></div>");
  convertButtonGroup.append(convertButton);
  convertButtonGroup.append(moreConvertButton);
  convertButtonGroup.buttonset();
  // A workaround to fix jQuery buttonset problem.
  // todo(bradph): learn the right way to use buttonset() with multiple buttons.
  convertButton.removeClass('ui-corner-right');
  convertButton.addClass('ui-corner-left');
  moreConvertButton.removeClass('ui-corner-left');
  moreConvertButton.addClass('ui-corner-right');

  // Create Add-to-an-Existing-Position Button
  var addButton = $(
	  "<button style='font-size:12px'>Add to an Existing Position</button>");
  var moreAddButton = $(
	  "<button style='font-size:12px'>Add to an Existing Task</button>");
  moreAddButton.button({text:false,icons: {primary: "ui-icon-triangle-1-s"}});
  var addButtonGroup = $("<div style='display:inline-block'></div>");
  addButtonGroup.append(addButton);
  addButtonGroup.append(moreAddButton);
  addButtonGroup.buttonset();
  addButton.removeClass('ui-corner-right');
  addButton.addClass('ui-corner-left');
  moreAddButton.removeClass('ui-corner-left');
  moreAddButton.addClass('ui-corner-right');

  $(inmailWidget).css({'margin-top':'15px'});
  $(inmailWidget).append(convertButtonGroup);
  $(inmailWidget).append(addButtonGroup);
  header_spans[0].appendChild(inmailWidget);
};