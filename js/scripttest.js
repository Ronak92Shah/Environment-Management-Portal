/////////////////////////////////////////// START OF CSS NAVIGATION BAR///////////////////////////////////////
// CSS for Navigation Bar
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');
});
})( jQuery );
/////////////////////////////////////////// END OF CSS NAVIGATION BAR///////////////////////////////////////
 
$(document).ready(function(){	
		
		datepicker();
		addTable();
		addTesting();
		checking();
		
	});
	
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
	
	function addTable(){
		
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
			add += "<td><input type='checkbox' name='" + data[i] +"'id = '" + data[i] + "'class = '" + data[i+1] + "'></td>"
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
		
		
	}

function checking(){
if ($("input[type=checkbox]:checked").length < 1){
$(".edit_release_package").prop('disabled', true);
$(".delete_release_package").prop('disabled', true);
}else if ($("input[type=checkbox]:checked").length == 1){
$(".edit_release_package").prop('disabled', false);
$(".delete_release_package").prop('disabled', false);	
}else{
$(".edit_release_package").prop('disabled', true);
$(".delete_release_package").prop('disabled', true);	
	
}		
}	
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
      }else{
	$.get("addReleasePackage.php", {new_release_pkg_name: new_release_pkg_name, new_release_phase_name: new_release_phase_name, new_release_start_date: new_release_start_date, new_release_end_date: new_release_end_date},  function(data, status){
        alert(data);
    });	
	  }
  });
	 });
	 
	 $(document).on('click',".edit_release_package", function(){
	$('#edit_release_pkg_error').hide();
	$('#edit_release_phase_error').hide();
	$('#edit_release_start_date_error').hide();
	$('#edit_release_end_date_error').hide();
	$("#edit_release_pkg_name").prop("readonly", true);
	$("#edit_release_phase_name").prop("readonly", true);
	var checkboxID = $(":checked").attr("id");
	var checkboxClass = $(":checked").attr("class");   
		
	$.getJSON("getReleaseDataPrefill.php",{checkboxID: checkboxID,checkboxClass:checkboxClass},function(data){
		for(var i = 0;  i < data.length; i++)
		{	
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
        alert(data);
    });	
	  }
  });

  //DELETE
  $(document).on('click',".delete_release_package", function(){

	var checkboxID = $(":checked").attr("id");
	var checkboxClass = $(":checked").attr("class");   
		
	$.getJSON("deleteReleaseData.php",{checkboxID: checkboxID,checkboxClass:checkboxClass},function(data){
	alert("Deleted");
	});
	 });
	 
	  
	// Getting Testing type for the Release package
function addTesting(){
	$.getJSON("getTestingPhase.php", success = function(data){
		
		var options = "";
		
		for(var i = 0;  i < data.length; i++)
		{
			options += "<option value='" + data[i] + "'>" + data[i] + "</option>";
		}
		$("#new_release_phase_name").append(options);
		$("#edit_release_phase_name").append(options);
		
	});
}
		setInterval('checking()',500);