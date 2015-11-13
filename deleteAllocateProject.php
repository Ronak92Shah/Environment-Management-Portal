<?php
	$proj_name = trim($_GET["proj_name"]);
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
	$count = 0;
						$query = "SELECT bookingTestingPhase FROM booking WHERE bookingProjName = '$proj_name'";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					$count += 1;
				}
							
						echo $count;	/*
	
							$query_delete = "DELETE FROM booking WHERE bookingProjName = '$proj_name'";
							//$new_project_name .$project_manager_name .$project_manager_email .$test_lead_name .$test_lead_email .$description .$release_package .$add_apps
								if ($dbConnect->query($query_delete) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
									// Even send the confirmation email to the user.
									$count = $count - 1;
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Testing Phase Added";
									$message = "Dear Erl, ";
									$headers = "From: EnvironmentalManagementPortal";
									 echo $count;				
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}else{
											echo "something is wrong";
									}
		}	
		else
		{
				echo "some problem in database";
		}
		*/
		}
		?>