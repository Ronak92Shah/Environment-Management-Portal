/////////////////////////////////////////// START OF CSS NAVIGATION BAR///////////////////////////////////////
// CSS for Navigation Bar
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');
});
})( jQuery );
/////////////////////////////////////////// END OF CSS NAVIGATION BAR///////////////////////////////////////

/////////////////////////////////////////// START OF DATEPICKER ///////////////////////////////////////	

	function datepicker(){
		    // Adding calender to the Firefox and IE
			var elem = document.createElement('input');
      elem.setAttribute('type', 'date');
 
      if ( elem.type === 'text' ) {
        $( ".date" ).datepicker({    
		  dateFormat: 'yy-mm-dd'
			});
      }	
	}
/////////////////////////////////////////// END OF DATEPICKER ///////////////////////////////////////	



/////////////////////////////////////////// START OF BOOKING PAGE///////////////////////////////////////
// Add Projects
$(document).ready(function(){
	$.getJSON("getProjectName.php", success = function(data){
		
		var add_Project = "";
		
		for(var i = 0;  i < data.length; i++)
		{
			add_Project += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		$("#get_project_name").append(add_Project);
		
	});
	
	// Adding table on selection of release package.
	
    $("select#get_project_name").change(function(){
		booking();

	});
	datepicker();
	
});

function checking(){
		if ($("input[type=checkbox]:checked").length < 1){
		$("#edit_booking").prop('disabled', true);
		}else if ($("input[type=checkbox]:checked").length == 1){
		$("#edit_booking").prop('disabled', false);
		}else{
		$("#edit_booking").prop('disabled', true);	
		}		

	var selected_Project_Name = $("#get_project_name option:selected").val();
	if(selected_Project_Name == 'Select'){
		$("#edit_booking").hide();
		
	}else{
		
		$("#edit_booking").show();
	}
		}
			setInterval('checking()',50);//To continuosly check



function booking(){
	
			$(".booking_table").empty();
	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked');		
        var selected_Project_Name = $("#get_project_name option:selected").val();
        //alert("You have selected the country - " + selectedCountry);
		if (selected_Project_Name != 'Select'){
		 $.getJSON("getProjectDataBooking.php",{name: selected_Project_Name},function(data){
		//var add = "<form>";
		
			var add = "<table>";
				
				add += "<tr>";
				
				add += "<th> Select </th>";
				add += "<th> Project Name </th>";
				add += "<th> Release Package </th>";
				add += "<th> Testing Phase </th>";
				add += "<th> Environment </th>";
				//add += "<th> Status </th>";
				add += "<th> Application </th>";
				add += "<th> Start Date </th>";
				add += "<th> End Date </th>";
				
				add += "</tr>";
				for(var i = 0;  i < data.length-1; i++)
				{
				
					add += "<tr>";
					add += "<td><input type='checkbox' class ='disableCheckbox' name='for_edit_booking' id = '" + data[i] + "'></td>";
					i++;
					add += "<td>" +data[i] +"</td>";
					i++;
					add += "<td>" +data[i] +"</td>";
					i++;
					add += "<td>" +data[i] +"</td>";
					
					//i++;
					//add += "<td>" +data[i] +"</td>";
					i++;
					
					if(data[i+1] == "Pending" || data[i+1] == "Not Assigned"){
					i++;
					add += "<td>" +data[i] +"</td>";
					}else{
						add += "<td>" +data[i] +"</td>";
						i++;
					}
					i++;
					add += "<td>" +data[i] +"</td>";
					i++;
					add += "<td>" +data[i] +"</td>";
					i++;
					add += "<td>" +data[i] +"</td>";
					add += "</tr>";
				}	
			add += "</table>";
		//add += "</form>";
	
		$(".booking_table").append(add);	
		});
	
		}
}
var requestID;
// Prefill for Editing Booking
	 $(document).on('click',"#edit_booking", function(){
		 
	var primaryKey = "";
		$('input[name="for_edit_booking"]:checked').each(function() {
		   primaryKey =this.id;
		});
		//alert(primaryKey);
	$.getJSON("getAllocateDataPrefill.php",{primaryKey: primaryKey},function(data){
	
		for(var i = 0;  i < data.length; i++)
		{	//alert(data[i]);
			requestID = data[i];
			i++;
			$('#edit_booking_proj_name').val(data[i]);
			i++;
			$('#edit_booking_release_pkg').val(data[i]);
			i++;
			$('#edit_booking_testing_phase').val(data[i]);
			i++;
			i++;
			$('#edit_booking_startDate').val(data[i]);
			i++;
			$('#edit_booking_endDate').val(data[i]);
			i++;
			i++;
		}		
	});
	 });
	  
	// edit existing booking
		 $(document).on('click',"#update_booking", function(){
	
  	  var edit_booking_reqId = requestID;
	  var edit_booking_startDate = $("#edit_booking_startDate").val();
	  var edit_booking_endDate = $("#edit_booking_endDate").val();
	  var edit_booking_status = "Pending";
	 
	 var today = new Date();
	 
	 if (new Date(edit_booking_startDate) < today)
	 {
		 
		alert("Start Date cannot be less then todays date"); 
			
	 }else if(new Date(edit_booking_endDate) < new Date(edit_booking_startDate)){
		 
		 alert("End Date cannot cannot be less then Start Date");
		 
	 }else{
	 
	$.get("updateBooking.php", {edit_booking_reqId:edit_booking_reqId,edit_booking_startDate:edit_booking_startDate,edit_booking_endDate:edit_booking_endDate,edit_booking_status:edit_booking_status},  function(data, status){
      //  alert(data);
		setTimeout(booking(), 5000);
    });	
	 } 
  });

