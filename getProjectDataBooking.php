<?php
$name = trim($_GET["name"]);
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
					
				$query = "SELECT * FROM booking WHERE bookingProjName = '$name'";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_data,$result_query["requestID"]);
					array_push($array_data,$result_query["bookingProjName"]);
					array_push($array_data,$result_query["bookingReleasePkg"]);
					array_push($array_data,$result_query["bookingTestingPhase"]);
					array_push($array_data,$result_query["bookingEnvironment"]);
					array_push($array_data,$result_query["bookingStatus"]);
					array_push($array_data,$result_query["bookingApps"]);
					$start_date = date_create($result_query["bookingStartDate"]);
					$start_date = date_format($start_date,"d-m-Y");
					array_push($array_data,$start_date);
					
					$end_date = date_create($result_query["bookingEndDate"]);
					$end_date = date_format($end_date,"d-m-Y");
					array_push($array_data,$end_date);
					
				}
				echo json_encode($array_data);
						
		}
		else
		{
			echo "Database is down for maintenance";
		}
?>