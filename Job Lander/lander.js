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
      "     <div class='lander_button'><img id='steps_icon' style='height:1em;width:1em;padding-right:0.5em;'/>Steps</div>"+
      "     <div class='lander_button'><img id='list_icon' style='height:1em;width:1em;padding-right:0.5em'/>List</div>"+
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
      "     <div id='closed_expanded' style='display:none'>"+ 
              "<div id='tabs-min'>"+
              " <ul>"+
              "   <li><a href='#tabs-6'>not interested (56)</a></li>"+
              "   <li><a href='#tabs-7'>got rejected (28)</a></li>"+
              "   <li><a href='#tabs-8'>got an offer (2)</a></li>"+
              " </ul>"+
              " <div id='tabs-6'>"+
              "   <div id='closed_items' style='height:175px;overflow:auto'>"+
              "      <div class='closed_item'>"+
              "        <div class='closed_item_header'>"+
              "          Google - San Francisco, CA | Posted Today"+
              "        </div>"+
              "        <div class='closed_item_description' style='width:448px;word-wrap:normal;'>"+
              "          The role: Product Marketing Manager, Consumer... Work closely with Product Managers, Engineers and User Experience teams to develop optimal products for ... <a href='#'>More Details</a>"+
              "        </div>"+
              "      </div>"+
              "      <div class='closed_item'>"+
              "        <div class='closed_item_header'>"+
              "          Yelp - San Francisco, CA | Posted Yesterday"+
              "        </div>"+
              "        <div class='closed_item_description' style='width:448px;word-wrap:normal;'>"+
              "          The role: Description goes here ... <a href='#'>More Details</a>"+
              "        </div>"+
              "      </div>"+
              "      <div class='closed_item'>"+
              "        <div class='closed_item_header'>"+
              "          Tweeter - San Francisco, CA | Posted Yesterday"+
              "        </div>"+
              "        <div class='closed_item_description' style='width:448px;word-wrap:normal;'>"+
              "          The role: Description goes here ... <a href='#'>More Details</a>"+
              "        </div>"+
              "      </div>"+
              "   </div>"+
              " </div>"+
              " <div id='tabs-7'>"+
              " </div>"+
              " <div id='tabs-8'>"+
              " </div>"+
              "</div>"+
      "     </div>"+
      "   </div>"+
      "   <div class='lander_tab_footer'>"+
      "     View and Move Positions - Steps"+
      "   </div>"+
      " </div>"+
      " <div id='tabs-2'>"+
      "   <form id='lander_create_position'>"+
      "     <input id='lander_position_name' type='text' placeholder='Position Name'/><br/>"+
      "     <textarea id='lander_position_description' placeholder='Description'/><br/>"+
      "     <input id='lander_postition_company' type='text' placeholder='Company'/><br/>"+
      "     <textarea id='lander_position_comments' placeholder='Comments'/><br/>"+
      "     <input id='lander_position_app_link' type='text' placeholder='Link to Application'/><br/>"+
      "     <input id='lander_position_app_due_date' type='text' class='lander_datepicker' placeholder='Application Due Date'/><br/>"+
      "     <input id='lander_position_submit' type='submit' value='Create and Move'>"+
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
    $("#tabs-min", frame).tabs({ collapsible: true, selected: -1 });
    //TODO: Make .lander_datepicker class elements pop out a datepicker. Not sure why the following code doesn't work:
    //$(".lander_datepicker", frame).datepicker();
    //That code doesn't work if left right there. If, instead, I run that statement in the Console after the page is up, it does work.
    $(".ui-tabs .ui-tabs-panel", frame).css({'padding-bottom':'0em'});
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
    });
    $("#steps_icon", frame).attr("src", chrome.extension.getURL("linesstep.png"));
    $("#list_icon", frame).attr("src", chrome.extension.getURL("lineslist.png"));
    $("#lander_create_position", frame).submit(function(){
      var position = {};
      position.name = $("#lander_position_name", frame).val();
      position.details = {};
      position.details.description = $("#lander_position_description", frame).val();
      position.details.company = $("#lander_position_company", frame).val();
      position.details.comments = $("#lander_position_comments", frame).val();
      position.details.app_link = $("#lander_position_app_link", frame).val();
      position.details.app_due_date = $("#lander_position_app_due_date", frame).val();
      /*$.post("http://joblander.herokuapp.com/users/1/positions.json", JSON.stringify(position), 
        function(data) {
          console.log(JSON.stringify(data));
        }
      );*/
      $.ajax({
        url:"http://joblander.herokuapp.com/users/1/positions.json",
        type:"POST",
        data:JSON.stringify(position),
        contentType:"application/json"
      });
      
       return false;
    });
  }
  
  $(function() {
    makeWidget();
  });

}());