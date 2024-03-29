/* Inline Widget related code goes here. */
window.jld = window.jld || {};
window.jld.inmailWidget = {};

// find the right place to host common function.
window.jld.common = window.jld.common || {};
jld.common.stripHtml = function(html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
}

jld.inmailWidget.getConvertButtonGroup = function(title,emailId) {
    // Create Convert-to-a-New-Position Button
    var convertButton = $("<button style='font-size:12px' class='convertBtn'>Convert to a New Position</button>");
    var moreConvertButton = $(
                              "<button style='font-size:12px'>Convert to a New Task</button>");
    moreConvertButton.button({text:false,icons: {primary: "ui-icon-triangle-1-s"}});
    var convertButtonGroup = $("<div style='display:inline-block' class='convertBtnGroup'></div>");
    convertButtonGroup.append(convertButton);
    convertButton.click(function(){
        $(".jld #new_position_name").val(title);
        $(".jld #new_position_description").val('');
        $(".jld #new_position_company").val('');
        $(".jld #new_position_comments").val('');
        $(".jld #new_position_app_link").val('');
        $(".jld #new_position_app_due_date").val('');
		if ($('.jld #lander_widget').tabs().tabs('option', 'selected') != 1) {
            $('.jld #lander_widget').tabs('select', 1);
		}
        $('.jld #new_position_email').html(
            '<input type=checkbox checked> Attach Email <span class="ui-icon ui-icon-link"></span>' +
            '<div class=email eid="' + emailId + '"><a href="#inbox/' + emailId + '" style="color:blue;text-decoration:underline">' +
            title + '</a></div>');
    });
    convertButtonGroup.append(moreConvertButton);
    convertButtonGroup.buttonset();
    // A workaround to fix jQuery buttonset problem.
    // todo(bradph): learn the right way to use buttonset() with multiple buttons.
    convertButton.removeClass('ui-corner-right');
    convertButton.addClass('ui-corner-left');
    moreConvertButton.removeClass('ui-corner-left');
    moreConvertButton.addClass('ui-corner-right');
    return convertButtonGroup;
};

jld.inmailWidget.getAddExistingButtonGroup = function() {
    // Create Add-to-an-Existing-Position Button
    var addButton = $(
                      "<button style='font-size:12px'>Add to an Existing Position</button>");
    var moreAddButton = $(
                          "<button style='font-size:12px'>Add to an Existing Task</button>");
    moreAddButton.button({text:false,icons: {primary: "ui-icon-triangle-1-s"}});
    var addButtonGroup = $("<div style='display:inline-block' class='addBtnGroup'></div>");
    addButtonGroup.append(addButton);
    addButton.click(function(){
        if ($('.jld #lander_widget').tabs().tabs('option', 'selected') != 0) {
            $('.jld #lander_widget').tabs('select', 0);
        }
        if ($('.jld #stepTabs').tabs().tabs('option', 'selected') != 1) {
            $('.jld #stepTabs').tabs('select', 1);
        }
        $('.jld #tabs-1').addClass('attachment');
    });
    addButtonGroup.append(moreAddButton);
    addButtonGroup.buttonset();
    addButton.removeClass('ui-corner-right');
    addButton.addClass('ui-corner-left');
    moreAddButton.removeClass('ui-corner-left');
    moreAddButton.addClass('ui-corner-right');
    return addButtonGroup;
};

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

  $(inmailWidget).css({'margin-top':'15px'});
  $(inmailWidget).append(jld.inmailWidget.getConvertButtonGroup(jld.common.stripHtml(title_spans[0].innerHTML),
                                                                hashval[hashval.length-1]));
  $(inmailWidget).append(jld.inmailWidget.getAddExistingButtonGroup());
  header_spans[0].appendChild(inmailWidget);

/*  $('.jld .convertBtn').click(function() {
    alert(123);
    $('.jld #newPosBtn').click();
  });*/
};