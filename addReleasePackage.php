<?php

$new_release_pkg_name = trim($_GET["new_release_pkg_name"]);
$release_phase_name = trim($_GET["new_release_phase_name"]);
$release_start_date = trim($_GET["new_release_start_date"]);
$release_end_date = trim($_GET["new_release_end_date"]);


	//echo $new_release_pkg_name ."  " .$release_phase_name ."  " .$release_start_date ."  " .$release_end_date;
	
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
	
		$sql_table="releasepackage";
							// check: if table does not exist, create it
		$query = "show tables like '$sql_table'";  // another alternative is to just use 'create table if not exists ...'
		$result = @mysqli_query($dbConnect, $query);
		// checks if any tables of this name
		if(mysqli_num_rows($result)==1)
		{
				// Check whether customer with this email id and password exist.
					
				$query = "SELECT * from releasepackage";
							
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_releasePkgName = array();
				$array_releasePhaseName = array();
				while ($result_query = mysqli_fetch_array($query_select))
				{	
					array_push($array_releasePkgName,$result_query["releasePkgName"]);
					array_push($array_releasePhaseName,$result_query["releasePhaseName"]);
				}
				
				$arr1 = count($array_releasePkgName);
				$arr2 = count($array_releasePhaseName);
				
			/*	for($i = 0; $i <= ($arr1-1) ; $i++)
				{
					if($array_releasePkgName[$i] == $new_release_pkg_name){
						for($j = 0; $j <= ($arr2-1) ; $j++){					
						
						if($array_releasePhaseName[$j] == $release_phase_name){
						
						$check = "false"; 
						}
						}
				
				}
					}	
						*/if($check == "true"){
						
							$query_insert = "INSERT INTO releasepackage(releasePkgName,releasePhaseName,releaseStartDate,releaseEndDate)
											VALUES('$new_release_pkg_name','$release_phase_name','$release_start_date','$release_end_date')";
							
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Success";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Release Package Added";
									$message = "Dear Erl, New Release Package named $release_phase_name has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									}
								
						else{
							echo "Not Added, Release Package already exist";
						}}
		}
		else
		{
			echo "Database is down for maintenance";
		}
?>