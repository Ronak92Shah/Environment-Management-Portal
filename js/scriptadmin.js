/////////////////////////////////////////// START OF CSS NAVIGATION BAR///////////////////////////////////////
// CSS for Navigation Bar
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');
});
})( jQuery );
/////////////////////////////////////////// END OF CSS NAVIGATION BAR///////////////////////////////////////

/////////////////////////////////////////// START OF DROPDOWN///////////////////////////////////////
// Admin page tabs
$(document).ready(function(){
  // do your checks of the radio buttons here and show/hide what you want to
  $("#selection option[value='select']").attr("selected", "selected");
$("#display_allocate").hide();
$("#display_release_package").hide();
$("#display_application").hide();
$("#display_testing_phase").hide();
$("#display_environment").hide();
$("#display_status").hide();

 $('#selection').change(function() {
         
		 if (this.value == "allocate"){ 
            $("#display_release_package").hide();
			$("#display_application").hide();
			$("#display_testing_phase").hide();
			$("#display_environment").hide();
			$("#display_status").hide();
			$("#display_allocate").show();           
         }
         else  if (this.value == "release_package"){ 
            $("#display_release_package").show();
			$("#display_application").hide();
			$("#display_testing_phase").hide();
			$("#display_status").hide();
			$("#display_allocate").hide();
			$("#display_environment").hide(); 			
         }
		 else  if (this.value == "application"){ 
            $("#display_release_package").hide();
			$("#display_application").show();
			$("#display_testing_phase").hide();
			$("#display_environment").hide();
			$("#display_allocate").hide();  
			$("#display_status").hide();			
         }
		 else  if (this.value == "server"){ 
            $("#display_release_package").hide();
			$("#display_application").show();
			$("#display_testing_phase").hide();
			$("#display_environment").hide();
			$("#display_allocate").hide();
			$("#display_status").hide();			
         }
		 else  if (this.value == "testing_phase"){ 
            $("#display_release_package").hide();
			$("#display_application").hide();
			$("#display_testing_phase").show();
			$("#display_environment").hide();
			$("#display_allocate").hide();
			$("#display_status").hide();			
         }
		 else if (this.value == "environment"){
			$("#display_release_package").hide();
			$("#display_application").hide();
			$("#display_testing_phase").hide();
			$("#display_environment").show();
			$("#display_allocate").hide();
			$("#display_status").hide();			
		} else if (this.value == "status"){
			$("#display_release_package").hide();
			$("#display_application").hide();
			$("#display_testing_phase").hide();
			$("#display_environment").hide();
			$("#display_allocate").hide();
			$("#display_status").show();			
		}
		else{
			$("#display_allocate").hide();
			$("#display_release_package").hide();
			$("#display_application").hide();
			$("#display_testing_phase").hide();
			$("#display_environment").hide();
			$("#display_status").hide();
	}
    });
});
/////////////////////////////////////////// END OF DROPDOWN ///////////////////////////////////////

/////////////////////////////////////////// START OF ONLOAD FUNCTION CALLS ///////////////////////////////////////
$(document).ready(function(){	
		datepicker();
		//addTesting();
		checking();
		addStatus();
		addEnvironmentAllocate();
		addEnvironment();
		addTesting();
	});
/////////////////////////////////////////// END OF ONLOAD FUNCTION CALLS ///////////////////////////////////////	

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

/////////////////////////////////////////// START OF ENABLING AND DISABLING NEW,EDIT AND DELETE BUTTONS ///////////////////////////////////////	

		function checking(){
		if ($("input[type=checkbox]:checked").length < 1){
		$(".edit_allocate").prop('disabled', true);
		$(".delete_allocate").prop('disabled', true);
		$(".edit_release_package").prop('disabled', true);
		$(".delete_release_package").prop('disabled', true);
		$(".delete_testing_phase").prop('disabled', true);
		$(".delete_environment").prop('disabled', true);
		$(".edit_application").prop('disabled', true);
		$(".delete_status").prop('disabled', true);
				$(".delete_application").prop('disabled', true);
		}else if ($("input[type=checkbox]:checked").length == 1){
		$(".edit_allocate").prop('disabled', false);
		$(".delete_allocate").prop('disabled', false);
		$(".edit_release_package").prop('disabled', false);
		$(".delete_release_package").prop('disabled', false);	
		$(".delete_testing_phase").prop('disabled', false);
		$(".delete_environment").prop('disabled', false);
		$(".edit_application").prop('disabled', false);
		$(".delete_application").prop('disabled', false);
		$(".delete_status").prop('disabled', false);
		}else{
		$(".edit_allocate").prop('disabled', true);
		$(".delete_allocate").prop('disabled', true);
		$(".edit_release_package").prop('disabled', true);
		$(".delete_release_package").prop('disabled', true);		
		$(".delete_testing_phase").prop('disabled', true);
		$(".delete_environment").prop('disabled', true);
		$(".edit_application").prop('disabled', true);
		$(".delete_application").prop('disabled', true);
		$(".delete_status").prop('disabled', true);
		}		
	}
			setInterval('checking()',500);//To continuosly check
/////////////////////////////////////////// END OF ENABLING AND DISABLING NEW,EDIT AND DELETE BUTTONS ///////////////////////////////////////	

/////////////////////////////////////////// START OF Allocate ///////////////////////////////////////

	$(document).on('click',"#allocate", function(){
				allocate();
				
	});
	
	function allocate(){
		$(".allocate_table").empty();
		 
	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked');
		 $.getJSON("getAllAllocateData.php",function(data){
		var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th style='text-align:center'> Select </th>";
		add += "<th style='text-align:center'> requestID </th>";
		add += "<th style='text-align:center'> Project Name </th>";
		add += "<th style='text-align:center'> Release Package </th>";
		add += "<th style='text-align:center'> Testing Phase </th>";
		add += "<th style='text-align:center'> Application </th>";
		add += "<th style='text-align:center'> Start Date </th>";
		add += "<th style='text-align:center'> End Date </th>";	
		add += "<th style='text-align:center'> Environment </th>";
		add += "<th style='text-align:center'> Status </th>";		
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{
			add += "<tr id = 'alternateRows'>";
			add += "<td><input type='checkbox' class ='disableCheckbox' name='for_edit_allocate' id = '" + data[i] + "'></td>"
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".allocate_table").append(add);	
		});		
	}
	 // Getting Environment for Allocate
	function addEnvironmentAllocate(){
		$("#edit_allocate_environment").empty();
	$.getJSON("getEnvironment.php", success = function(data){
		
		var options = "";
			options += "<option> Select </option>";
		for(var i = 0;  i < data.length; i++)
		{
			options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		$("#edit_allocate_environment").append(options);
	});
}
		 // Getting Booking Status for Allocate
	function addStatus(){
		$("#edit_allocate_status").empty();		
	$.getJSON("getStatus.php", success = function(data){
		
		var options = "";
			options += "<option> Select </option>";		
		for(var i = 0;  i < data.length; i++)
		{
			options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		$("#edit_allocate_status").append(options);
	});
}
 // Prefill for Editing Allocate
	 $(document).on('click',".edit_allocate", function(){
		 
	var primaryKey = "";
		$('input[name="for_edit_allocate"]:checked').each(function() {
		   primaryKey =this.id;
		});
		//alert(primaryKey);
	$.getJSON("getAllocateDataPrefill.php",{primaryKey: primaryKey},function(data){
	
		for(var i = 0;  i < data.length; i++)
		{	//alert(data[i]);
			$('#edit_allocate_reqId').val(data[i]);
			i++;
			$('#edit_allocate_proj_name').val(data[i]);
			i++;
			$('#edit_allocate_release_pkg').val(data[i]);
			i++;
			$('#edit_allocate_testing_phase').val(data[i]);
			i++;
			$('#edit_allocate_application').val(data[i]);
			i++;
			$('#edit_allocate_startDate').val(data[i]);
			i++;
			$('#edit_allocate_endDate').val(data[i]);
			i++;
			$('#edit_allocate_environment').val(data[i]);
			i++;
			$('#edit_allocate_status').val(data[i]);
		}		
	});
	 });
	  
	// edit existing allocate
		 $(document).on('click',"#update_allocate", function(){
	
  	  var edit_allocate_reqId = $("#edit_allocate_reqId").val();
	  var edit_allocate_proj_name = $("#edit_allocate_proj_name").val();	 
	  var edit_allocate_release_pkg = $("#edit_allocate_release_pkg").val();
	  var edit_allocate_testing_phase = $("#edit_allocate_testing_phase").val();
	  var edit_allocate_application = $("#edit_allocate_application").val();
	  var edit_allocate_startDate = $("#edit_allocate_startDate").val();
	  var edit_allocate_endDate = $("#edit_allocate_endDate").val();
	  var edit_allocate_environment = $("#edit_allocate_environment").val();
	  var edit_allocate_status = $("#edit_allocate_status").val();
	 
	$.get("updateAllocate.php", {edit_allocate_reqId: edit_allocate_reqId, edit_allocate_proj_name: edit_allocate_proj_name, edit_allocate_release_pkg: edit_allocate_release_pkg, edit_allocate_testing_phase: edit_allocate_testing_phase,edit_allocate_application:edit_allocate_application,edit_allocate_startDate:edit_allocate_startDate,edit_allocate_endDate:edit_allocate_endDate,edit_allocate_environment:edit_allocate_environment,edit_allocate_status:edit_allocate_status},  function(data, status){
     // alert(data);
	  
			setTimeout(function(){
			allocate(); 
		}, 400);
    });	
	  
  });

    //Deleting Release Package 
  $(document).on('click',".delete_allocate", function(){
	var primaryKey = "";
		$('input[name="for_edit_allocate"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		
	$.getJSON("deleteAllocate.php",{primaryKey: primaryKey},function(data){
	//alert(data);
	});
			setTimeout(function(){
			allocate(); 
		}, 400);
	 });

/////////////////////////////////////////// END OF Allocate ///////////////////////////////////////


/////////////////////////////////////////// START OF Release package ///////////////////////////////////////	

	$(document).on('click',"#release_package", function(){
				releasePackage();
				
	});
	
	function releasePackage(){
		$(".mytable").empty();
		 
	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked');
		 $.getJSON("getAllReleaseData.php",function(data){
		var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th style='text-align:center'> Select </th>";
		add += "<th style='text-align:center'> Release Package </th>";
		add += "<th style='text-align:center'> Testing Type </th>";
		add += "<th style='text-align:center'> Start Date </th>";
		add += "<th style='text-align:center'> End Date </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{
			add += "<tr id = 'alternateRows'>";
			add += "<td><input type='checkbox' class ='disableCheckbox' name='form_edit_release' id = '" + data[i] + "," + data[i+1] + "'></td>"
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			i++;
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".mytable").append(add);	
		});		
	}
	
	// Getting Testing type for the Release package
		function addTesting(){
			
				$("#new_release_phase_name").empty();
				$("#edit_release_phase_name").empty();
			
			$.getJSON("getTestingPhase.php", success = function(data){
				
				var options = "";
				options += "<option> Select </option>";
				for(var i = 0;  i < data.length; i++)
				{
					options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
				}
				$("#new_release_phase_name").append(options);
				$("#edit_release_phase_name").append(options);		
			});
		}
	
	// Add new release package
	 $(document).on('click',".new_release_package", function(){
		
	$('#release_pkg_error').hide();
	$('#release_phase_error').hide();
	$('#release_start_date_error').hide();
	$('#release_end_date_error').hide();
	$('#new_release_pkg_name').val("");
	$('#new_release_phase_name').val("");
	$('#new_release_start_date').val("");
	$('#new_release_end_date').val("");
	
		$("#new_release").click(function() {
      // validate and process form here      
    $('#release_pkg_error').hide();
	$('#release_phase_error').hide();
	$('#release_start_date_error').hide();
	$('#release_end_date_error').hide();
	
  	  var new_release_pkg_name = $("#new_release_pkg_name").val();
	  var new_release_phase_name = $("#new_release_phase_name").val();
	  var new_release_start_date = $("#new_release_start_date").val();
	  var new_release_end_date = $("#new_release_end_date").val();
	  var today = new Date();
	  
  		if ((new_release_pkg_name == "")) {
        $("#release_pkg_error").show();
        $("#new_release_pkg_name").focus();
        return false;
      } else if ((new_release_phase_name == "select")) {
        $("#release_phase_error").show();
        $("#new_release_phase_name").focus();
        return false;
      }else if ((new_release_start_date == "")) {
       // $("#release_start_date_error").show();
        $("#new_release_start_date").focus();
        return false;
      }else if ((new_release_end_date == "")) {
        //$("#release_end_date_error").show();
        $("#new_release_end_date").focus();
        return false;
      }else if (new Date(new_release_start_date) < today)
	 {
		 
		alert("Start Date cannot be less then todays date"); 
			
	 }else if(new Date(new_release_end_date) < new Date(new_release_start_date)){
		 
		 alert("End Date cannot cannot be less then Start Date");
		 
	 }else{
	$.get("addReleasePackage.php", {new_release_pkg_name: new_release_pkg_name, new_release_phase_name: new_release_phase_name, new_release_start_date: new_release_start_date, new_release_end_date: new_release_end_date},  function(data, status){
        if(data == "Success")
		{
			setTimeout(function(){
			releasePackage(); 
		}, 400);
			
			
		}
    });	
	  }
  });
	 });
	 	 
	 // Prefill for Editing Release Package
	 $(document).on('click',".edit_release_package", function(){
	$('#edit_release_pkg_error').hide();
	$('#edit_release_phase_error').hide();
	//$('#edit_release_start_date_error').hide();
	$('#edit_release_end_date_error').hide();
	$("#edit_release_pkg_name").prop("readonly", true);
	//$("#edit_release_phase_name").prop("readonly", true);

	var primaryKey = "";
		$('input[name="form_edit_release"]:checked').each(function() {
		   primaryKey =this.id;
		});
		//alert(primaryKey);
	$.getJSON("getReleaseDataPrefill.php",{primaryKey: primaryKey},function(data){
	
		for(var i = 0;  i < data.length; i++)
		{	//alert(data[i]);
			$('#edit_release_pkg_name').val(data[i]);
			i++;
			$('#edit_release_phase_name').val(data[i]);
			i++;
			$('#edit_release_start_date').val(data[i]);
			i++;
			$('#edit_release_end_date').val(data[i]);
		}		
	});
	 });
	  
	// edit existing release package 
		 $(document).on('click',"#update_release", function(){
      // validate and process form here      
    $('#edit_release_pkg_error').hide();
	$('#edit_release_phase_error').hide();
	$('#edit_release_start_date_error').hide();
	$('#edit_release_end_date_error').hide();
	
  	  var edit_release_pkg_name = $("#edit_release_pkg_name").val();
	  var edit_release_phase_name = $("#edit_release_phase_name").val();
	  var edit_release_start_date = $("#edit_release_start_date").val();
	  var edit_release_end_date = $("#edit_release_end_date").val();
	 
  		if ((new_release_pkg_name == "")) {
        $("#edit_release_pkg_error").show();
        $("#edit_release_pkg_name").focus();
        return false;
      } else if ((new_release_phase_name == "select")) {
        $("#edit_release_phase_error").show();
        $("#edit_release_phase_name").focus();
        return false;
      }else if ((new_release_start_date == "")) {
       // $("#release_start_date_error").show();
        $("#edit_release_start_date").focus();
        return false;
      }else if ((new_release_end_date == "")) {
        //$("#release_end_date_error").show();
        $("#edit_release_end_date").focus();
        return false;
      }else{
	$.get("updateReleasePackage.php", {edit_release_pkg_name: edit_release_pkg_name, edit_release_phase_name: edit_release_phase_name, edit_release_start_date: edit_release_start_date, edit_release_end_date: edit_release_end_date},  function(data, status){
      //  alert(data);
		setTimeout(function(){
			releasePackage(); 
		}, 400);
		});	
	  }
  });

  //Deleting Release Package 
  $(document).on('click',".delete_release_package", function(){
	var primaryKey = "";
		$('input[name="form_edit_release"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		
	$.getJSON("deleteReleaseData.php",{primaryKey: primaryKey},function(data){
	//alert(data);
	});
	setTimeout(function(){
    releasePackage(); 
	}, 400);
	 });
	 	  

/////////////////////////////////////////// END OF Release package ///////////////////////////////////////	
			
/////////////////////////////////////////// START OF Tesing Phase ///////////////////////////////////////	

	//	
  $(document).on('click',"#testing_phase", function(){
		testingPhase();		
  });

  function testingPhase(){
	  	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked');
	  $(".testingPhaseTable").empty();
  	  	$.getJSON("getTestingPhase.php",function(data){
        var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th style='text-align:center'> Select </th>";
		add += "<th style='text-align:center'> Testing Phase Name </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{	
			add += "<tr id = 'alternateRows'>";
			add += "<td><input type='checkbox'  class ='disableCheckbox' name='form_testing_phase' id = '" + data[i] + "'></td>";
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".testingPhaseTable").append(add);
    });		  
  }
  
	// New TesingPhase

$(document).on('click',".new_testing_phase", function(){
	$('#testing_phase_error').hide();
	$('#testing_name').val("");	
		$("#testing_submit").click(function() {
      // validate and process form here      
    $('#testing_phase_error').hide();
	
  	  var new_testing_name = $("#testing_name").val();
	 //alert(new_testing_name);
  		if ((new_testing_name == "")) {
        $("#testing_phase_error").show();
        $("#testing_name").focus();
      }else{
	$.get("addTestingPhase.php", {new_testing_name: new_testing_name},  function(data, status){
       // alert(data);
	        if(data == "Success")
		{
		setTimeout(function(){
			testingPhase(); 
			addTesting();
		}, 400);
		}
    });	
	  }
  });
	 });
	 
	   //Delete TestingPhase
  $(document).on('click',".delete_testing_phase", function(){
		
	var primaryKey = "";
		$('input[name="form_testing_phase"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		
	$.getJSON("deleteTestingPhase.php",{primaryKey: primaryKey},function(data){
	//alert(data);
	});
	setTimeout(function(){
    testingPhase();
	addTesting();	
	}, 400);
	 });  
		
/////////////////////////////////////////// END OF TESTINHG PHASE ///////////////////////////////////////			

/////////////////////////////////////////// START OF ENVIRONMENT ///////////////////////////////////////	

// ON selecting environment from Drop Down this wil be selected.
  $(document).on('click',"#environment", function(){
	  environment();
  });
  
  // function to add environment table
  function environment(){
	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked'); // uncheck checkboxes
	$(".environmentTable").empty(); // emty table every time so no duplicates
  	  	$.getJSON("getEnvironment.php",function(data){
        var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th style='text-align:center'> Select </th>";
		add += "<th style='text-align:center'> Environment Name </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{	
			add += "<tr id = 'alternateRows'>";
			add += "<td><input type='checkbox'  class ='disableCheckbox' name='form_environment' id = '" + data[i] + "'></td>";
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".environmentTable").append(add);
    });		
  }
  
  // Add New Environemnt
$(document).on('click',".new_environment", function(){
	$('#envirnoment_error').hide();
	$('#envirnoment_name').val("");	
		$("#envirnoment_submit").click(function() {
      // validate and process form here      
    $('#envirnoment_error').hide();
	
  	  var new_envirnoment_name = $("#envirnoment_name").val();
	 //alert(new_testing_name);
  		if ((new_envirnoment_name == "")) {
        $("#envirnoment_error").show();
        $("#envirnoment_name").focus();
      }else{
	$.get("addEnvironment.php", {new_envirnoment_name: new_envirnoment_name},  function(data, status){
      //  alert(data);
		        if(data == "Success")
		{
		setTimeout(function(){
    environment(); 
	addEnvironment();
	addEnvironmentAllocate();
		}, 400);
		}
    });	
	  }
  });
	 });

//DELETE Environment
  $(document).on('click',".delete_environment", function(){
	var primaryKey = "";
		$('input[name="form_environment"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		//alert("wassup");
	$.getJSON("deleteEnvironment.php",{primaryKey: primaryKey},function(data){
	//alert(data);
	});
	setTimeout(function(){
	addEnvironment();
    environment();
	addEnvironmentAllocate();
	}, 400);
	 });  
	
/////////////////////////////////////////// END OF ENVIRONMENT ///////////////////////////////////////		

	$(document).on('click',"#application", function(){
			application();
			
		});

function application(){
	
	$(".application_table").empty();
	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked');
			 $.getJSON("getApplication.php",function(data){
			var add = "<form>";
			add += "<table>";
			add += "<tr>";
			add += "<th style='text-align:center'> Select </th>";
			add += "<th style='text-align:center'> Application Name </th>";
			add += "<th style='text-align:center'> Environment </th>";
			add += "<th style='text-align:center'> Server </th>";
			add += "<th style='text-align:center'> Version </th>";
			add += "<th style='text-align:center'> IP </th>";
			add += "<th style='text-align:center'> Category </th>";
			add += "</tr>";
			for(var i = 0;  i < data.length; i++)
			{
				add += "<tr id = 'alternateRows'>";
				add += "<td><input type='checkbox'  class ='disableCheckbox' name='form_edit_app' id = '" + data[i] + "," + data[i+1] + "," + data[i+2] + "'></td>"
				add += "<td>" +data[i] +"</td>";
				i++;
				add += "<td>" +data[i] +"</td>";
				i++;
				add += "<td>" +data[i] +"</td>";
				i++;
				add += "<td>" +data[i] +"</td>";
				i++;
				add += "<td>" +data[i] +"</td>";
				i++;
				add += "<td>" +data[i] +"</td>";
				add += "</tr>";
			}
			add += "</table>";
			add += "</form>";
			$(".application_table").append(add);	
			});	
		}

			 // Getting Environment for Application
function addEnvironment(){
	$.getJSON("getEnvironment.php", success = function(data){
		$("#new_app_environment").empty();
		$("#edit_app_environment").empty();
		var options = "";
		options += "<option> Select </option>";
		for(var i = 0;  i < data.length; i++)
		{
			options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		$("#new_app_environment").append(options);
		$("#edit_app_environment").append(options);

	});
}
			
// Add New Application
$(document).on('click',".new_application", function(){
	$('#app_name_error').hide();
	$('#app_environment_error').hide();
	$('#app_server_error').hide();
	$('#app_version_error').hide();
	$('#app_ip_error').hide();
	$('#app_category_error').hide();
	
	$('#new_app_name').val("");
	$('#new_app_environment').val("");
	$('#new_app_server').val("");
	$('#new_app_version').val("");
	$('#new_app_ip').val("");
	$('#new_app_category').val("");
	
	$("#new_application").click(function() {
      // validate and process form here      
	$('#app_name_error').hide();
	$('#app_environment_error').hide();
	$('#app_server_error').hide();
	$('#app_version_error').hide();
	$('#app_ip_error').hide();
	$('#app_category_error').hide();
	
  	  var new_app_name = $("#new_app_name").val();
	  var new_app_environment = $("#new_app_environment").val();
	  var new_app_server = $("#new_app_server").val();
	  var new_app_version = $("#new_app_version").val();
	  var new_app_ip = $("#new_app_ip").val();
	  var new_app_category = $("#new_app_category").val();
	 
  		if ((new_app_name == "")) {
        $("#app_name_error").show();
        $("#new_app_name").focus();
        return false;
      } else if ((new_app_environment == "select")) {
        $("#app_environment_error").show();
        $("#new_app_environment").focus();
        return false;
      }else if ((new_app_server == "")) {
        $("#app_server_error").show();
        $("#new_app_server").focus();
        return false;
      }else if ((new_app_version == "")) {
        $("#app_version_error").show();
        $("#new_app_version").focus();
        return false;
      }else if ((new_app_ip == "")) {
        $("#app_ip_error").show();
        $("#new_app_ip").focus();
        return false;
      }else if ((new_app_category == "")) {
        $("#app_category_error").show();
        $("#new_app_category").focus();
        return false;
      }else{
	$.get("addApplication.php", {new_app_name: new_app_name, new_app_environment: new_app_environment, new_app_server: new_app_server, new_app_version: new_app_version, new_app_ip: new_app_ip, new_app_category: new_app_category},  function(data, status){
        //alert(data);
	
		        if(data == "Success")
		{
		setTimeout(function(){
			application();
		}, 400);
	
		}
    });	
	  }
  });
	 });

		// Prefill Application for editing
		$(document).on('click',".edit_application", function(){
	$('#edit_app_name_error').hide();
	$('#edit_app_environment_error').hide();
	$('#edit_app_server_error').hide();
	$('#edit_app_version_error').hide();
	$('#edit_app_ip_error').hide();
	$('#edit_app_category_error').hide();
	
	$("#edit_app_name").prop("readonly", true);
	$("#edit_app_environment").prop("readonly", true);
	$("#edit_app_server").prop("readonly", true);
	var primaryKey = "";
		$('input[name="form_edit_app"]:checked').each(function() {
		   primaryKey =this.id;
		});
		//alert(primaryKey);
	$.getJSON("getApplicationDataPrefill.php",{primaryKey: primaryKey},function(data){
		for(var i = 0;  i < data.length; i++)
		{	//alert(data[i]);
			$('#edit_app_name').val(data[i]);
			i++;
			$('#edit_app_environment').val(data[i]);
			i++;
			$('#edit_app_server').val(data[i]);
			i++;
			$('#edit_app_version').val(data[i]);
			i++
			$('#edit_app_ip').val(data[i]);
			i++;
			$('#edit_app_category').val(data[i]);
			i++
		}
		
	});
	 });
	
		
		// Edit Application 
		 $(document).on('click',"#update_application", function(){
			 
	$('#edit_app_name_error').hide();
	$('#edit_app_environment_error').hide();
	$('#edit_app_server_error').hide();
	$('#edit_app_version_error').hide();
	$('#edit_app_ip_error').hide();
	$('#edit_app_category_error').hide();
	
  	  var edit_app_name = $("#edit_app_name").val();
	  var edit_app_environment = $("#edit_app_environment").val();
	  var edit_app_server = $("#edit_app_server").val();
	  var edit_app_version = $("#edit_app_version").val();
	  var edit_app_ip = $("#edit_app_ip").val();
	  var edit_app_category = $("#edit_app_category").val();
	 
  		if ((edit_app_name == "")) {
        $("#edit_app_name_error").show();
        $("#edit_app_name").focus();
        return false;
      } else if ((edit_app_environment == "select")) {
        $("#edit_app_environment_error").show();
        $("#edit_app_environment").focus();
        return false;
      }else if ((edit_app_server == "")) {
        $("#edit_app_server_error").show();
        $("#edit_app_server").focus();
        return false;
      }else if ((edit_app_version == "")) {
        $("#edit_app_version_error").show();
        $("#edit_app_version").focus();
        return false;
      }else if ((edit_app_ip == "")) {
        $("#edit_app_ip_error").show();
        $("#edit_app_ip").focus();
        return false;
      }else if ((edit_app_category == "")) {
        $("#edit_app_category_error").show();
        $("#edit_app_category").focus();
        return false;
      }else{
	$.get("updateApplication.php", {edit_app_name: edit_app_name, edit_app_environment: edit_app_environment, edit_app_server: edit_app_server, edit_app_version: edit_app_version, edit_app_ip: edit_app_ip, edit_app_category: edit_app_category},  function(data, status){
      //  alert(data);
	setTimeout(function(){
    application(); 
	}, 400);
    });	
	  }
  });

   //Delete Application
  $(document).on('click',".delete_application", function(){
		
	var primaryKey = "";
		$('input[name="form_edit_app"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		
	$.getJSON("deleteApplication.php",{primaryKey: primaryKey},function(data){
	//alert(data);
	});	
	setTimeout(function(){
    application(); 
	}, 400);
	//application();
	 });
  
/////////////////////////////////////////// START OF STATUS ///////////////////////////////////////		
 
 // ON selecting status from Drop Down this wil be selected.
  $(document).on('click',"#status", function(){
	  status();
  });
  
  // function to add Status table
  function status(){
	  	$('#middle').find('input[type=checkbox]:checked').removeAttr('checked'); // uncheck checkboxes
	  		$(".statusTable").empty(); // emty table every time so no duplicates
  	  	$.getJSON("getStatus.php",function(data){
        var add = "<form>";
		add += "<table>";
		add += "<tr>";
		add += "<th style='text-align:center'> Select </th>";
		add += "<th style='text-align:center'> Status Name </th>";
		add += "</tr>";
		for(var i = 0;  i < data.length; i++)
		{	
			add += "<tr id = 'alternateRows'>";
			add += "<td><input type='checkbox'  class ='disableCheckbox' name='form_status' id = '" + data[i] + "'></td>";
			add += "<td>" +data[i] +"</td>";
			add += "</tr>";
		}
		add += "</table>";
		add += "</form>";
		$(".statusTable").empty();
		$(".statusTable").append(add);
    });		
  }
  
  // Add New Status
$(document).on('click',".new_status", function(){
	$('#status_error').hide();
	$('#status_name').val("");	
		$("#status_submit").click(function() {
      // validate and process form here      
    $('#status_error').hide();
	
  	  var new_status_name = $("#status_name").val();
	 //alert(new_testing_name);
  		if ((new_status_name == "")) {
        $("#status_error").show();
        $("#status_name").focus();
      }else{
	$.get("addStatus.php", {new_status_name: new_status_name},  function(data, status){
     // alert(data);

	});	
	  } 
	  	setTimeout(function(){
		$(".statusTable").empty();
		status(); 
		addStatus();
		}, 400);
  });

	 });

   //Delete Application
  $(document).on('click',".delete_status", function(){
		
	var primaryKey = "";
		$('input[name="form_status"]:checked').each(function() {
		   primaryKey =this.id;
		}); 
		
	$.getJSON("deleteStatus.php",{primaryKey: primaryKey},function(data){
	//alert(data);

	});
	setTimeout(function(){
		
    status();
	addStatus();
	}, 400);		 
	 });

/////////////////////////////////////////// END OF STATUS ///////////////////////////////////////