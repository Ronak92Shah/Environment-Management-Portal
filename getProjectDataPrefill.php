<?php

	$name = trim($_GET["name"]);
	//echo json_encode($name);

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
	
		$sql_table="project";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
				// Check whether customer with this email id and password exist.
					
				$query = "SELECT * FROM project where projName = '$name' ";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_data,$result_query["projName"]);
					array_push($array_data,$result_query["projManagerName"]);
					array_push($array_data,$result_query["projManagerEmail"]);
					array_push($array_data,$result_query["projTestLeadName"]);
					array_push($array_data,$result_query["projTestLeadEmail"]);
					array_push($array_data,$result_query["projDesc"]);
					array_push($array_data,$result_query["projReleasePkg"]);
					array_push($array_data,$result_query["projAppNames"]);
					$app_arr = explode(',',$result_query["projAppNames"]);
					foreach($app_arr as $value){
						array_push($array_data,$value);
					}
					
					
				}
				echo json_encode($array_data);

		}
		else
		{
			echo "Database is down for maintenance";
		}
?>