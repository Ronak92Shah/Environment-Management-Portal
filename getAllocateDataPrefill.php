<?php

	$primaryKey = trim($_GET["primaryKey"]);
	 
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
					
				$query = "SELECT * FROM booking where requestID = '$primaryKey' ";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_data,$result_query["requestID"]);
					array_push($array_data,$result_query["bookingProjName"]);
					array_push($array_data,$result_query["bookingReleasePkg"]);
					array_push($array_data,$result_query["bookingTestingPhase"]);
					array_push($array_data,$result_query["bookingApps"]);
					array_push($array_data,$result_query["bookingStartDate"]);
					array_push($array_data,$result_query["bookingEndDate"]);
					array_push($array_data,$result_query["bookingEnvironment"]);
					array_push($array_data,$result_query["bookingStatus"]);
				}
				echo json_encode($array_data);
		}
		else
		{
			echo "Database is down for maintenance";
		}
?>