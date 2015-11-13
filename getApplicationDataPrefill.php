<?php
//appName,appEnvironment,appServerName,appVersion,appIPAddress,appCategory
	$primaryKey = trim($_GET["primaryKey"]);
	
	$str_explode=explode(",",$primaryKey);
	$appName = $str_explode[0]; 
	$appEnvironment = $str_explode[1];
	$appServerName = $str_explode[2]; 
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
	
		$sql_table="application";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
				// Check whether customer with this email id and password exist.
					
				$query = "SELECT * FROM application where appName = '$appName' And appEnvironment = '$appEnvironment' And appServerName = '$appServerName' ";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_data,$result_query["appName"]);
					array_push($array_data,$result_query["appEnvironment"]);
					array_push($array_data,$result_query["appServerName"]);
					array_push($array_data,$result_query["appVersion"]);
					array_push($array_data,$result_query["appIPAddress"]);
					array_push($array_data,$result_query["appCategory"]);
				}
				echo json_encode($array_data);
		}
		else
		{
			echo "Database is down for maintenance";
		}
?>