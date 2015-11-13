<?php

	$new_envirnoment_name = trim($_GET["new_envirnoment_name"]);
	
	
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
	
		$sql_table="environment";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
			
					
				$query = "SELECT * from environment";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_environment_data = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_environment_data,$result_query["envName"]);
				}
				
				$arr = count($array_environment_data);
				
				for($i = 0; $i <=$arr-1 ; $i++)
				{
					if($array_environment_data[$i] == $new_envirnoment_name){
					
						$check = "false"; 
				
				}
					}	
						if($check == "true"){
						
							$query_insert = "INSERT INTO environment(envName)VALUES('$new_envirnoment_name')";
							
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Success";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Environment Added";
									$message = "Dear Erl, New Environmentnamed $new_envirnoment_name has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}
								
						}else{
							echo "Environment already exist";
						}			
		}
		else
		{
			echo "Database is down for maintenance";
		}

?>