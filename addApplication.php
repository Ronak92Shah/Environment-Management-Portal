<?php

$new_app_name = trim($_GET["new_app_name"]);
$app_environment = trim($_GET["new_app_environment"]);
$app_version = trim($_GET["new_app_version"]);
$app_server = trim($_GET["new_app_server"]);
$app_ip = trim($_GET["new_app_ip"]);
$app_category = trim($_GET["new_app_category"]);

	//echo $new_app_name ."  " .$app_environment ."  " .$app_version ."  " .$app_server ."  " .$app_ip ."  " .$app_category;
	
	
	$check = "true";
	
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
							$query_insert = "INSERT INTO application(appName,appEnvironment,appServerName,appVersion,appIPAddress,appCategory)
											VALUES('$new_app_name','$app_environment','$app_server','$app_version','$app_ip','$app_category')";
							
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Success";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Release Package Added";
									$message = "Dear Erl, New Release Package named $new_app_name has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}else{
										
										echo "not added";
									}
		
		}else{
			echo "Database is down for maintenance";
		}
	
	
?>