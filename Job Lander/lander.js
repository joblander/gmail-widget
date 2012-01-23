// Draft of Job Lander

(function() {

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
      " <div id='tabs-1'>"+
      "   <div class='lander_tab_header'>"+
      "     <span class='title'>Product Manager, San Francisco</span>"+
      "     <div class='lander_button'>Configurate</div>"+
      "     <div class='lander_button'>Steps</div>"+
      "     <div class='lander_button'>List</div>"+
      "   </div>"+
      "   <div class='lander_tab_content'>"+
      "     <div id='active_positions'>"+
      "       Active<br/>"+
      "       <div>"+
      "         <table id='active_table'>"+
      "           <tr>"+
      "             <th>To Review</th>"+
      "             <th>To Apply</th>"+
      "             <th>Applied and Waiting</th>"+
      "             <th>To Schedule</th>"+
      "             <th>Interviewed and Waiting</th>"+
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
      "     </div>"+
      "     <div id='closed_positions' style='text-align:center'>"+
      "       Closed<br/>"+
      "       <table>"+
      "         <tr>"+
      "           <th><br/><br/></th>"+ // These line breaks are put here to align the table data in this section with the data in the active section.
      "         </tr>"+
      "         <tr>"+
      "           <td>0</td>"+
      "         </tr>"+
      "       </table>"+
      "     </div>"+
      "     <div class='clearboth'></div>"+
      "   </div>"+
      "   <div class='lander_tab_footer'>"+
      "     View and Move Positions - Steps"+
      "   </div>"+
      " </div>"+
      " <div id='tabs-2'>"+
      "   <form>"+
      "     <input type='text' placeholder='Position Name'/><br/>"+
      "     <textarea placeholder='Description'/><br/>"+
      "     <input type='text' placeholder='Company'/><br/>"+
      "     <textarea placeholder='Comments'/><br/>"+
      "     <input type='text' placeholder='Link to Application'/><br/>"+
      "     <input type='text' class='lander_datepicker' placeholder='Application Due Date'/><br/>"+
      "     <input type='submit' value='Create and Move'>"+
      "   </form>"+
      "   <div class='lander_tab_footer'>"+
      "     Create New Position"+
      "   </div>"+
      " </div>"+
      " <div id='tabs-3'>Tasks"+
      "   <div class='lander_tab_footer'>"+
      "     View and Move Tasks"+
      "   </div>"+
      " </div>"+
      " <div id='tabs-4'>"+
      "   <form>"+
      "     <input type='text' placeholder='Task Name'/><br/>"+
      "     <textarea placeholder='Description'/><br/>"+
      "     <input type='text' class='lander_datepicker' placeholder='Due Date'/><br/>"+
      "     <input type='submit' value='Create'>"+
      "   </form>"+
      "   <div class='lander_tab_footer'>"+
      "     Create New Task"+
      "   </div>"+
      " </div>"+
      " <div id='tabs-5'>Settings"+
      "   <div class='lander_tab_footer'>"+
      "     Settings"+
      "   </div>"+
      " </div>"+
      "</div>";
    return html;
  }

  makeWidget = function() {
    frame = $("#canvas_frame").contents()[0];

    var widget = frame.createElement("div");
    widget.id = "lander_widget";
    widget.className += "round";
    widget.style.position = "fixed";
    widget.style.top = "100px";
    //widget.style.right = "7px"; 
    frame.body.appendChild(widget);
    $(widget).html(htmlContent());

    $("#lander_widget", frame).draggable({ iframeFix: true, containment: "document", handle: "#lander_handle" });
    $("#lander_tabs", frame).tabs({ collapsible: true, selected: -1 });
    //TODO: Make .lander_datepicker class elements pop out a datepicker. Not sure why the following code doesn't work:
    //$(".lander_datepicker", frame).datepicker();
    //That code doesn't work if left right there. If, instead, I run that statement in the Console after the page is up, it does work.
    $(".ui-tabs .ui-tabs-panel", frame).css({'padding-bottom':'0em'});
  }
  
  $(function() {
    makeWidget();
  });

}());