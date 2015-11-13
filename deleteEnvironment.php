<?php
	$environmentName = trim($_GET["primaryKey"]); 
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
	
		$sql_table="environment";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
							$query_delete = "DELETE FROM environment WHERE envName='$environmentName';";
							//$new_project_name .$project_manager_name .$project_manager_email .$test_lead_name .$test_lead_email .$description .$release_package .$add_apps
								//echo "Deleted";
								
									if (mysqli_query($dbConnect, $query_delete)) {
										echo "Record deleted successfully";
									} else {
										echo "Error deleting record: " . mysqli_error($dbConnect);
									};
									
		}	
		else
		{
				echo "some problem in database";
		}
		mysqli_close($dbConnect);
		?>