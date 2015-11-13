<?php

	$appName = trim($_GET["edit_app_name"]);
	$appEnvironment = trim($_GET["edit_app_environment"]);
	$appServerName = trim($_GET["edit_app_server"]);
	$appVersion = trim($_GET["edit_app_version"]);
	$appIPAddress = trim($_GET["edit_app_ip"]);
	$appCategory = trim($_GET["edit_app_category"]);
	
//	echo $appName. ", " .$appEnvironment. ", ".$appServerName. ", ". $appVersion. ", " .$appIPAddress. ", ". $appCategory;
	
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
		{//appName,appEnvironment,appServerName,appVersion,appIPAddress,appCategory
							$query_update = "UPDATE application
											SET appVersion = '$appVersion',appIPAddress = '$appIPAddress', appCategory = '$appCategory'
											WHERE appName = '$appName' And appEnvironment = '$appEnvironment' And appServerName = '$appServerName'";
							//$new_project_name .$project_manager_name .$project_manager_email .$test_lead_name .$test_lead_email .$description .$release_package .$add_apps
								if ($dbConnect->query($query_update) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "uDATED MATE";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Testing Phase Added";
									$message = "Dear Erl, ";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}else{
											echo "something is wrong";
									}
		}	
		else
		{
				echo "some problem in database";
		}
		?>