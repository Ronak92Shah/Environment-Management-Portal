<?php

	$proj_name = trim($_GET["proj_name"]);
	$proj_release_package = trim($_GET["proj_release_package"]);
	$proj_phase = ($_GET["proj_phase"]);
	$proj_startDate = trim($_GET["proj_startDate"]);
	$proj_endDate = trim($_GET["proj_endDate"]);
	$proj_apps = trim($_GET["proj_apps"]);
	$proj_apps = rtrim($proj_apps, ',');
	
	//echo $proj_name .",". $proj_release_package.",".$proj_phase.",".$proj_startDate.",".$proj_endDate.",".$proj_apps;
	
	//proj_name proj_release_package, proj_phase,proj_startDate, proj_endDate,proj_apps

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
		
					
						
							$query_insert = "INSERT INTO booking(requestID , bookingProjName ,bookingReleasePkg ,bookingEnvironment ,bookingTestingPhase ,bookingStatus ,bookingApps ,bookingStartDate ,bookingEndDate )
							VALUES(NULL,'$proj_name','$proj_release_package',NULL,'$proj_phase' ,'Not Assigned' ,'$proj_apps' ,'$proj_startDate' ,'$proj_endDate');";
							//proj_name proj_release_package, proj_phase,proj_startDate, proj_endDate,proj_apps
								
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Project is added to the database";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Testing Phase Added";
									$message = "Dear Erl, New Testing Phase named  has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}else{
											echo "something is wrong";
									}
								
								
		
		}
		else
		{
			echo "No table";
		}
		
		?>
		