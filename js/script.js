/////////////////////////////////////////// START OF CSS NAVIGATION BAR///////////////////////////////////////
// CSS for Navigation Bar
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');
});
})( jQuery );
/////////////////////////////////////////// END OF CSS NAVIGATION BAR///////////////////////////////////////



/////////////////////////////////////////// START OF EXTRA///////////////////////////////////////


$(document).ready(function(){
  // do your checks of the radio buttons here and show/hide what you want to
  $("#new_proj").hide();

  $(document).on('click', '#proj' , function() {
         if (this.value == "add_new_project"){ 
            $("#update_proj").hide();
			$("#new_proj").show();           
         }
         else {
            $("#new_proj").hide();
			$("#update_proj").show();			
         }       
    });

});
/////////////////////////////////////////// END OF EXTRA///////////////////////////////////////


// Add Projects
$(document).ready(function(){
	$.getJSON("getProjectName.php", success = function(data){
		
		var add_Project = "";
		
		for(var i = 0;  i < data.length; i++)
		{
			add_Project += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		add_Project += "<option value='" + "Add New" + "'>" + "Add New" + "</option>";
		$("#project_name").append(add_Project);
		
	});
});
var old_release_pkg = "";
var old_application_data = "";
// check if new project or existing project and prefill existing project
$(document).ready(function(){
	$('#add_new_project').hide();
	$('#add_submit').hide();
	$('#update_submit').hide();
	
    $("select#project_name").change(function(){
	
		$("#release_proj_error").hide();
		$("#new_project_name_error").hide();
		$("#add_table").empty();
		$('#add_new_project').hide();
		$('#add_submit').hide();
		$('#update_submit').hide();
        var selected_Project = $("#project_name option:selected").val();
        //alert("You have selected the country - " + selectedCountry);
		if(selected_Project == "Add New"){
		$("#new_project_name").prop("readonly", false);		
		$('#add_new_project').show();
		$('#add_submit').show();
		
		$(':input').not(':button, :hidden, :checkbox, :radio').val('');
		$(':checkbox, :radio').prop('checked', false);
		
		//alert("hey there");
		}else{
		$("#new_project_name").prop("readonly", true);
		$('#add_new_project').show();
		$('#update_submit').show();
		
		    $(':input').not(':button,:checkbox, :radio').val('');
			$(':checkbox, :radio').prop('checked', false);
		$.getJSON("getProjectDataPrefill.php",{name: selected_Project},function(data){
		
		for(var i = 0;  i < data.length; i++)
		{	
		
		//$('#add_new_project').show();
			$('#new_project_name').val(data[i]);
			i++;
			$('#project_manager_name').val(data[i]);
			i++;
			$('#project_manager_email').val(data[i]);
			i++;
			$('#test_lead_name').val(data[i]);
			i++;
			$('#test_lead_email').val(data[i]);
			i++	;		
			$('#description').val(data[i]);
			i++;
			 $('[name=release_package]').val( data[i] );
			old_release_pkg = data[i];
			i++;
			old_application_data = data[i];
			for(var j = 7; j<=data.length; j++){
			checkWithValue(data[j]);
			i++;
			}
		}
				function checkWithValue(val) {
			$(":checkbox").filter(function() {
				return this.value == val;
			}).prop("checked", "true");
		}		
		});
		}
		});
	});

// Project Page Adding Applications as check Box
$(document).ready(function(){
	$.getJSON("getAppData.php", success = function(data){
		
		var App_Data = "";
		for(var i = 0;  i < data.length; i++)
		{ App_Data += "<div class = 'col'> ";
			App_Data += "<label for = " + data[i] + "><input type='checkbox' name='app[]' value=" + data[i] + " id = " + data[i] + "/>"+ data[i] +"</label>";
		  App_Data += "</div>";
		}
		
		$("#add_apps").append(App_Data);
		
	});
});

// Get Release Package
$(document).ready(function(){
	$.getJSON("getRelease.php", success = function(data){
		
		var options = "";
		
		for(var i = 0;  i < data.length; i++)
		{
			options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		
		$("#release_package").append(options);
		
	});
});


//get details of release package on selection
$(document).ready(function(){
	
    $("select#release_package").change(function(){
		
		$("#add_table").empty();
		
        var selected_Release_Package = $("#release_package option:selected").val();
        //alert("You have selected the country - " + selectedCountry);
	
		 $.getJSON("getReleaseData.php",{name: selected_Release_Package},function(data){
		var add = "<table>";
		add += "<tr>";
		add += "<th> Testing Type </th>";
		add += "<th> Start Date </th>";
		add += "<th> End Date </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{
			add += "<tr>";
			//alert(data[i])
			add += "<td class = 'allo_release_phase_name' id = " + data[i] +">" +data[i] +"</td>";
			i++;
			add += "<td class = 'allo_release_start_date' id = " + data[i] +">" +data[i] +"</td>";
			i++;
			add += "<td class = 'allo_release_end_date' id = " + data[i] +">" +data[i] +"</td>";
			add += "</tr>";
			
		}
		add += "</table>";
		$("#add_table").append(add);	
		});
	});
});

// Add new project
$(function() {
    $('#new_project_name_error').hide();
	$("#release_proj_error").hide();
	
    $("#submit_add").click(function() {
      // validate and process form here      
      $('#new_project_name_error').hide();
	  
  	  var new_project_name = $("#new_project_name").val();
	  var project_manager_name = $("#project_manager_name").val();
	  var project_manager_email = $("#project_manager_email").val();
	  var test_lead_name = $("#test_lead_name").val();
	  var test_lead_email = $("#test_lead_email").val();
	  var description = $("#description").val();
	 // var app_category = $("#app_category").val();
	  var release_package = $("#release_package").val();
	  var add_apps = "";

		$('input[type = checkbox]:checked').map(function() {
            add_apps += ($(this).val()) + ",";
		});
	
  		if ((new_project_name == "")) {
        $("#new_project_name_error").show();
        $("#new_project_name").focus();
        return false;
      }else if ((release_package == "select")) {
        $("#release_proj_error").show();
        $("#release_package").focus();
        return false;
      } else{
	$.get("addProject.php", {name:"new",new_project_name: new_project_name, project_manager_name:project_manager_name,project_manager_email:project_manager_email,test_lead_name:test_lead_name,test_lead_email:test_lead_email,description:description,release_package:release_package,add_apps:add_apps,old_release_pkg:old_release_pkg,old_application_data:old_application_data},  function(data, status){
        alert(data);
	
    });	
	}
	  });
			
// Update project
	  
	      $("#submit_update").click(function() {
      // validate and process form here      
      $('#new_project_name_error').hide();
	  
  	  var new_project_name = $("#new_project_name").val();
	  var project_manager_name = $("#project_manager_name").val();
	  var project_manager_email = $("#project_manager_email").val();
	  var test_lead_name = $("#test_lead_name").val();
	  var test_lead_email = $("#test_lead_email").val();
	  var description = $("#description").val();
	 // var app_category = $("#app_category").val();
	  var release_package = $("#release_package").val();
	  var add_apps = "";

		$('input[type = checkbox]:checked').map(function() {
            add_apps += ($(this).val()) + ",";
		});
	
  		if ((new_project_name == "")) {
        $("#new_project_name_error").show();
        $("#new_project_name").focus();
        return false;
      }else if ((release_package == "select")) {
        $("#release_proj_error").show();
        $("#release_package").focus();
        return false;
      } else{
	$.get("addProject.php", {name:"update",new_project_name: new_project_name, project_manager_name:project_manager_name,project_manager_email:project_manager_email,test_lead_name:test_lead_name,test_lead_email:test_lead_email,description:description,release_package:release_package,add_apps:add_apps,old_release_pkg:old_release_pkg,old_application_data:old_application_data},  function(data, status){
        alert(data);
    });	
	}
	  });	  
	  
	});

/////////////////////////////////////////// END OF PROJECT PAGE///////////////////////////////////////


// Admin page tabs
$(document).ready(function(){
  // do your checks of the radio buttons here and show/hide what you want to
$("#allocate_release").hide();
$("#allocate_application").hide();
$("#allocate_phase").hide();
$("#allocate_environment").hide();
  $(document).on('click', '#allocate' , function() {
         if (this.value == "add_release_package"){ 
            $("#allocate_alloc").hide();
			$("#allocate_application").hide();
			$("#allocate_phase").hide();
			$("#allocate_environment").hide();
			$("#allocate_release").show();           
         }
         else  if (this.value == "add_application"){ 
            $("#allocate_alloc").hide();
			$("#allocate_phase").hide();
			$("#allocate_environment").hide();
			$("#allocate_release").hide();
			$("#allocate_application").show();			
         }
		 else  if (this.value == "add_testing_phase"){ 
            $("#allocate_alloc").hide();
			$("#allocate_release").hide();
			$("#allocate_application").hide();
			$("#allocate_environment").hide();
			$("#allocate_phase").show();  		
         }
			 else  if (this.value == "add_environment"){ 
            $("#allocate_alloc").hide();
			$("#allocate_release").hide();
			$("#allocate_application").hide();
			$("#allocate_phase").hide();
			$("#allocate_environment").show();  		
         }
		 else{
			$("#allocate_release").hide();
			$("#allocate_application").hide();
			$("#allocate_phase").hide();
			$("#allocate_environment").hide();
			$("#allocate_alloc").show();
	}
    });

});
/////////////////////////////////////////// START ///////////////////////////////////////


$(document).ready(function(){	
		
        //alert("You have selected the country - " + selectedCountry);
	
		 $.getJSON("getAllReleaseData.php",function(data){
		var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th> Select </th>";
		add += "<th> Release Package </th>";
		add += "<th> Testing Type </th>";
		add += "<th> Start Date </th>";
		add += "<th> End Date </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{
			add += "<tr id = " +data[i] + " class = " +data[i+1]+">";
			add += "<td><input type='checkbox' name='" + data[i] +"'id = '" + data[i] +"'></td>"
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td class = 'releaseStartDate'>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".mytable").append(add);	
		});
	});

$(function() {

	//when a td element within tbody is clicked
	$('.mytable').on('click','td.releaseStartDate',function() {
		//call displayform, passing td jQuery element
		displayForm( $(this) );
		$(this).focus();
	});

});

function displayForm( cell ) {

	var column = cell.attr('class'),//class of td corresponds to database table column
		primaryKey1 = cell.closest('tr').attr('id'),//id of tr corresponds to database primary key
		primaryKey2 = cell.closest('tr').attr('class'),//class of tr corresponds to database primary key
		cellWidth = cell.css('width'),//get width of cell for styling width of input field
		prevContent = cell.text(),//store previous value
		//form action prevents page refresh when enter pressed.  hidden fields pass primary key and column name
		form = '<form><input type="date"  class = "date" name="newValue" value="'+
			   prevContent+'" /><input type="hidden" name="primaryKey1" value="'+primaryKey1+'" /><input type="hidden" name="primaryKey2" value="'+primaryKey2+'" />'+
			   '<input type="hidden" name="column" value="'+column+'" /></form>';

	//insert form into td and change focus to input field, set width
	cell.html(form).find('input[type=date]')
		.focus()
		.select()
		//.css('width',cellWidth);

	//disable listener on individual cell once clicked
	cell.on('click', focus, function(){
		
		return false});

	//on keypress within td
	cell.on('keydown',function(e) {
	
		if (e.keyCode == 13) {//13 == enter
			changeField(cell, prevContent);//update field
		} else if (e.keyCode == 27) {//27 == escape
			cell.text(prevContent);//revert to original value
		}
	});
		$(".releaseStartDate").prop('disabled', true);
}

function changeField( cell, prevContent ) {

	//remove keydown listener once action initiated
	cell.off('keydown');
	
	var url = 'ajax.php?edit&',//relative path to PHP processing script
		input = cell.find('form').serialize();//serialize form for passing via url
		
	//send ajax request
	$.getJSON(url+input, function(data) {//data argument is used to retrieve response from processing script

		//On success, update cell to new value
		if (data.success){
		cell.html(data);
		//alert("done");
		}
		else {
			//On failure, revert to original value and alert
			alert("There was a problem updating the data.  Please try again.");
			cell.html(prevContent);
			}
						$(".releaseStartDate").prop('disabled', false);
	});
	
			//$(".releaseStartDate").prop('disabled', false);
	//remove click handler to allow tbody handler to make field editable again
	//cell.off('click');

}
/////////////////////////////////////////// END ///////////////////////////////////////

// Adding calender to the Firefox and IE
 $(document).ready(function() {
      var elem = document.createElement('input');
      elem.setAttribute('type', 'date');
 
      if ( elem.type === 'text' ) {
        $( ".date" ).datepicker({    
		  dateFormat: 'yy-mm-dd'
			});
      }
   });
   
   $(document).on('focus',".date", function(){

        $( ".date" ).datepicker({    
		  dateFormat: 'yy-mm-dd'
		  		});
				
   });

 $(document).on('focus',".date", function(){

    $( ".date" ).datepicker({ 
		   onClose: function ()
    {
        // The "this" keyword refers to the input (in this case: #someinput)
        (".releaseStartDate").focus();
    }
	});
      });