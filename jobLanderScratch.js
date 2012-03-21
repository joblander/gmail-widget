//TODO Make hover transprency button. If I do, make a handle with the joblander logo that remains untransparent
    $("#lander_widget", frame).hover(
      function(){
        $(this).css('opacity','1.0');
      },
      function(){
        $(this).css('opacity','0.2');
      }  
    );
//Do the whole right align tabs transparency thing
//Maybe move drag handle somewhere
//Datepicker
//Make buttons in forms right aligned and auto width
//Dropdown for form buttons
//Put shadow back in
//Change buttons to clickable divs
//Make steps sortable
//Make sure Closed div is same height as Active. Can be done with javascript
//Do hover for acttive position table
//Make hover cursor hand, not caret
//Change Active Table to Divs. It get scrunched up
//Find the overall color of the background and make taskfore match that
//Download jQuery UI 1.8.17
//The active positions and closed positions divs dont have the same bottom margin. if the widget is stretched too much; the user may wanna stretch the widget at some point
//Fix the width of the closed positions list to not be a hard coded width
//Make the Closed div connected to the expanded part...?
//Work on resizing
//Does the widget load when the page is offscreen or another tab has focus? Sometimes it seems not to.
//At some point I may go back and remove unnecessary jQuery
//Find way to put the widget's html in an html file so I don' thave to put it in a string in javascript (which is cumbersome).

/* After Brad Refactored: */
// Datepicker fixed
// Maybe Try using most up-to-date jquery now
// Clear out text box when moving to different tabor activity
// Notification should be cleared out
      "       <div>"+
      "         <table>"+
      "           <tr>"+
      "             <td>To Review</td>"+
      "             <td>To Apply</td>"+
      "             <td>Applied and Waiting</td>"+
      "             <td>To Schedule</td>"+
      "             <td>Interviewed and Waiting</td>"+
      "           </tr>"+
      "           <tr>"+
      "             <td>56</td>"+
      "             <td>7</td>"+
      "             <td>1</td>"+
      "             <td>0</td>"+
      "             <td>0</td>"+
      "           </tr>"+
      "         </table>"+
      "       </div>"+





$(".ui-tabs-nav", $("#canvas_frame").contents()).css({'height':'2.35em' , 'text-align':'right'});
$(".ui-tabs-nav li", $("#canvas_frame").contents()).css({'display':'inline-block' , 'float':'none' , 'margin':'0em'});

$(".ui-tabs-nav", $("#canvas_frame").contents()).css({  
	'padding-left':'0px',
	'background':'transparent',
	'border-width':'0px 0px 1px 0px',
	'border-radius':'0px',
	'-moz-border-radius':'0px',
	'-webkit-border-radius':'0px'
})

$("#lander_tabs", $("#canvas_frame").contents()).css({'background-color':'rgba(0,0,0,0.3)'});
$("#lander_tabs", $("#canvas_frame").contents()).css({'background-color':'transparent'});










window.getFrame = function() {
  var b = document.getElementById("canvas_frame");
  var a = (b.contentWindow||b.contentDocument);
  if (a.document) {
    a = a.document
  }  
  return a;
}


  /*
  getFrame = function() {
    var b = document.getElementById("canvas_frame");
    var a = (b.contentWindow||b.contentDocument);
    if (a.document) {
      a = a.document
    }  
    return a;
  }
  */

//window.onload = function() {
//  frame = window.getFrame();
//
//  var widget = document.createElement("div");
//  widget.id = "draggable";
//  widget.style.width = "150px";
//  widget.style.height = "150px";
//  widget.style.padding = "0.5em";
//  p = document.createElement("p");
//  p.appendChild(document.createTextNode("Job Lander"));
//  widget.appendChild(p);
//  frame.body.appendChild(widget);

  //setTimeout( "$('#pageFrame').contents().find('#draggable').draggable({ iframeFix: true })", 1000 );
//};


widgetCSS = { backgroundColor: "red", width: "150px", height: "150px", padding: "0.5em",
              zIndex: "5", position: "fixed", top: "100px", right: "5px" };                  
$(widget).css(widgetCSS);

#rsw{
  background-color:#FFFFFF;
  font-size:26px;
  height:500px;
  position:absolute;
  right:20px;
  top:20px;
  width:220px;
  z-index:10000;
}

  htmlContent = function() {
    html = "<div id='lander_handle'></div>"+
      "<div id='lander_positions_tabs' class='lander_tabs'>"+
      " <ul>"+
      "   <li><a href='#tabs-1'>Positions</a></li>"+
      "   <li><a href='#tabs-2'>+</a></li>"+
      " </ul>"+
      " <div id='tabs-1'>This is 1</div>"+
      " <div id='tabs-2'>This is number 2</div>"+      
      "</div>"+
      "<div id='lander_tasks_tabs' class='lander_tabs'>"+
      " <ul>"+
      "   <li><a href='#tabs-3'>Tasks</a></li>"+
      "   <li><a href='#tabs-4'>+</a></li>"+
      " </ul>"+
      " <div id='tabs-3'>This is the third</div>"+
      " <div id='tabs-4'>This is la four</div>"+
      "</div>"+
      "<div id='lander_settings_tab' class='lander_tabs'>"+
      " <ul>"+
      "   <li><a href='#tabs-5'>Settings</a></li>"+
      " </ul>"+
      " <div id='tabs-5'>This is cinco</div>"+
      "</div>";
    return html;
  }
  
  
  
  htmlContent = function() {
    html = "<div id='lander_handle'></div>"+
      "<div id='lander_tabs'>"+
      " <ul>"+
      "   <li><a href='#tabs-1'>Positions</a></li>"+
      "   <li><a href='#tabs-2'>+</a></li>"+
      "   <li><a href='#tabs-3'>Tasks</a></li>"+
      "   <li><a href='#tabs-4'>+</a></li>"+
      "   <li><a href='#tabs-5'>Settings</a></li>"+
      " </ul>"+
      " <div id='tabs-1'>This is 1</div>"+
      " <div id='tabs-2'>This is number 2</div>"+
      " <div id='tabs-3'>This is the third</div>"+
      " <div id='tabs-4'>This is la four</div>"+
      " <div id='tabs-5'>This is cinco</div>"+
      "</div>";
    return html;
  }
  
  
  $(function() {
    $( $("#canvas_frame").contents() ).ready(function() {
      setTimeout( makeWidget(), 1000 );    
    });
  });
  
  $(function() {
    setTimeout( makeWidget(), 1000 );
  });
  
  $(function() {
    makeWidget();  
  });