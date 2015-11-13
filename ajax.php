<?php

//Open the connection
	// Connect to mysql server
	$dbConnect = @mysqli_connect("localhost", "root", "");
		if (!$dbConnect)
			die("<p>The database server is not available.</p>");
			//echo "<p>Successfully connected to the database server.</p>";
											
	//Connect to Database
	$dbSelect = @mysqli_select_db($dbConnect, "environment_management_portal");
		if (!$dbSelect)
			die("<p>The database is not available.</p>");
			//echo "<p>Successfully opened the database.</p>";
	
		$sql_table="booking";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
				// Check whether customer with this email id and password exist.
					
				$query = "SELECT * FROM booking";
					
				$query_select = mysqli_query($dbConnect, $query);
					
	
				$e = array();
				
				while ($result_query = mysqli_fetch_array($query_select))
				{
					$array_data = array();
					$data = array();
					array_push($array_data,$result_query["bookingProjName"]);
					array_push($array_data,$result_query["bookingReleasePkg"]);
					array_push($array_data,$result_query["bookingTestingPhase"]);
					array_push($array_data,$result_query["bookingEnvironment"]);
					array_push($array_data,$result_query["bookingStartDate"]);
					array_push($array_data,$result_query["bookingEndDate"]);
					
					$data['title'] = "Proj Name: " .$array_data[0] ."			Testing: " .$array_data[2];
					$data['projName'] = "Project Name: " .$array_data[0];
					$data['start'] = $array_data[4];
					$data['end'] = $array_data[5];					
					$data['release'] = $array_data[1];
					$data['testing'] = $array_data[2];
					$data['environment'] =$array_data[3];
					array_push($e, $data);
				
		}
		echo json_encode($e);
		}
		else
		{
			echo "Database is down for maintenance";
		}
?>