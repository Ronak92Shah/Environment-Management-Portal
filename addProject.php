<?php

	$new_project_name = trim($_GET["new_project_name"]);
	$project_manager_name = trim($_GET["project_manager_name"]);
	$project_manager_email = trim($_GET["project_manager_email"]);
	$test_lead_name = trim($_GET["test_lead_name"]);
	$test_lead_email = trim($_GET["test_lead_email"]);
	$description = trim($_GET["description"]);
	//$app_category = trim($_GET["app_category"]);
	$release_package = trim($_GET["release_package"]);
	$add_apps = trim($_GET["add_apps"]);
	$add_apps = rtrim($add_apps, ',');
	$chk = trim($_GET["name"]);
	$old_application_data = trim($_GET["old_application_data"]);
	$old_release_pkg = trim($_GET["old_release_pkg"]);
	
	//echo $release_package .$add_apps;
	//echo $old_release_pkg ." , ".$old_application_data. "  ,";
	
	$check = "true";  
	
	//echo($chk);

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
					if($chk == "new")
			{
				$query = "SELECT projName from project";
					
				$query_select = mysqli_query($dbConnect, $query);
					
				$array_proj_name = array();	
					
				while ($result_query = mysqli_fetch_array($query_select))
				{
					array_push($array_proj_name,$result_query["projName"]);
				}
				
				$arr = count($array_proj_name);
				
				for($i = 0; $i <=$arr-1 ; $i++)
				{
					if($array_proj_name[$i] == $new_project_name){
					
						$check = "false"; 			
				
				}
					}	
						if($check == "true"){
						
							$query_insert = "INSERT INTO project(projName, projManagerName,projManagerEmail,projTestLeadName,projTestLeadEmail,projDesc,projReleasePkg,projAppNames)
							VALUES('$new_project_name','$project_manager_name','$project_manager_email' ,'$test_lead_name' ,'$test_lead_email' ,'$description' ,'$release_package' ,'$add_apps')";
							//$new_project_name .$project_manager_name .$project_manager_email .$test_lead_name .$test_lead_email .$description .$release_package .$add_apps
								if ($dbConnect->query($query_insert) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "Project is added to the database";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Testing Phase Added";
									$message = "Dear Erl, New Testing Phase named $new_project_name has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									
									
				$query_bookRelease = "SELECT releasePhaseName,releaseStartDate,releaseEndDate FROM releasepackage WHERE releasePkgName = '$release_package';";
					
				$query_select_bookRelease = mysqli_query($dbConnect, $query_bookRelease);
					
				$array1 = array();				
					
				while ($result_query_bookRelease = mysqli_fetch_array($query_select_bookRelease))
				{
					array_push($array1,$result_query_bookRelease["releasePhaseName"]);
					array_push($array1,$result_query_bookRelease["releaseStartDate"]);
					array_push($array1,$result_query_bookRelease["releaseEndDate"]);
				}
						$count = count($array1);
						
					for ($i = 0; $i < $count; $i++){
						
						$j = $i +1;
						$k = $i +2;						
							$query_insert_book = "INSERT INTO booking(requestID , bookingProjName ,bookingReleasePkg ,bookingEnvironment ,bookingTestingPhase ,bookingStatus ,bookingApps ,bookingStartDate ,bookingEndDate )
							VALUES(NULL,'$new_project_name','$release_package',NULL,'$array1[$i]' ,'Not Assigned' ,'$add_apps' ,'$array1[$j]' ,'$array1[$k]');";
							//proj_name proj_release_package, proj_phase,proj_startDate, proj_endDate,proj_apps
								
								if ($dbConnect->query($query_insert_book) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
								//	echo "Project is added to the database";
																		
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
									$i++;
									$i++;

					}	
									}else{
											echo "Project Name already exist in the system";
									}
								
						}			
			}else{

							$query_update = "UPDATE project
											SET projManagerName = '$project_manager_name' ,projManagerEmail = '$project_manager_email', projTestLeadName = '$test_lead_name', projTestLeadEmail = '$test_lead_email', projDesc = '$description', projReleasePkg = '$release_package', projAppNames = '$add_apps'
											WHERE projName = '$new_project_name';";
							//$new_project_name .$project_manager_name .$project_manager_email .$test_lead_name .$test_lead_email .$description .$release_package .$add_apps
								if ($dbConnect->query($query_update) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									echo "UPDATED";
																		
									// Even send the confirmation email to the user.
									$email = "ronak92shah@gmail.com";
									$to = $email;
									$subject = "New Testing Phase Added";
									$message = "Dear Erl, New Testing Phase named $new_project_name has been added";
									$headers = "From: EnvironmentalManagementPortal";
																		
									mail($to, $subject, $message, $headers, "-r 4949773@student.swin.edu.au");
									
											if($old_release_pkg == $release_package){
			
			
											}else{
												
												$query_delete = "DELETE FROM booking WHERE bookingProjName = '$new_project_name'";
												if ($dbConnect->query($query_delete) === TRUE) {
													
													echo "Deleted";
													
													$query_bookRelease = "SELECT releasePhaseName,releaseStartDate,releaseEndDate FROM releasepackage WHERE releasePkgName = '$release_package';";
					
				$query_select_bookRelease = mysqli_query($dbConnect, $query_bookRelease);
					
				$array1 = array();				
					
				while ($result_query_bookRelease = mysqli_fetch_array($query_select_bookRelease))
				{
					array_push($array1,$result_query_bookRelease["releasePhaseName"]);
					array_push($array1,$result_query_bookRelease["releaseStartDate"]);
					array_push($array1,$result_query_bookRelease["releaseEndDate"]);
				}
						$count = count($array1);
						
					for ($i = 0; $i < $count; $i++){
						
						$j = $i +1;
						$k = $i +2;						
							$query_insert_book = "INSERT INTO booking(requestID , bookingProjName ,bookingReleasePkg ,bookingEnvironment ,bookingTestingPhase ,bookingStatus ,bookingApps ,bookingStartDate ,bookingEndDate )
							VALUES(NULL,'$new_project_name','$release_package',NULL,'$array1[$i]' ,'Not Assigned' ,'$add_apps' ,'$array1[$j]' ,'$array1[$k]');";
							//proj_name proj_release_package, proj_phase,proj_startDate, proj_endDate,proj_apps
								
								if ($dbConnect->query($query_insert_book) === TRUE) {
								// Once Data stored give an confirmation message to the customer. 
																		
									//echo "Project is Updated";
																		
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
									$i++;
									$i++;

					}
												}
									}
									if($old_application_data == $add_apps){
										
											
									}else{
										
										$query_update = "UPDATE booking
											SET bookingApps = '$add_apps'
											WHERE bookingProjName = '$new_project_name'" ;
								if ($dbConnect->query($query_update) === TRUE) {
										
										//echo "Allocate updated";
										
									}
									
									}
									
								}else{
											echo "something is wrong";
									}
		
		}
		
		}
		else
		{
				echo "check database";
		}
		mysqli_close($dbConnect);

		?>