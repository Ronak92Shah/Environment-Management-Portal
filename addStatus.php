<?php

	$new_status_name = trim($_GET["new_status_name"]);
	
	
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
	
		$sql_table="bookingstatus";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
						
							$query_insert = "INSERT INTO bookingstatus(statusValue)VALUES('$new_status_name')";
							
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Success";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Environment Added";
									$message = "Dear Erl, New Environmentnamed  has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}else{
										
										echo "Not added, same name exist";
									}
								
								
		}
		else
		{
			echo "Database is down for maintenance";
		}

?>