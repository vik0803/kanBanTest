<?php 
	require 'db.php';

	$result = mysql_query('SELECT * FROM users');
 
	$temp = array();

	while($row = mysql_fetch_array($result))
	{
	    $temp[] = $row;
	}

	$data = array('users' => $temp);
	echo json_encode($data);
	
if(isset($_GET['action']))
{
	switch ($_GET['action'])
	{
		case 'add':

			//Add records in a customers table
		    $sql = "INSERT INTO users 
		            (first_name, password) 
		            VALUES ('".addslashes(trim($_POST['name']))."', '".addslashes(trim($_POST['password']))."')";  


		    mysql_query($sql) or die("Error: Data Base query!(users)".mysql_error());
	
		break;

		case 'delete':

			//Delete records in a customers table
			$sql = "DELETE FROM users
					WHERE user_id = ".$_GET['id'];
	
			mysql_query($sql) or die("Error: Data Base query!(Delete products_content)".mysql_error());
		
		break;

		case 'edit':

			//Update records in a customers table
				$sql = " UPDATE users 
						SET first_name = '".$_POST['name']."', 
							password = '".$_POST['password']."' ".
						"WHERE user_id = ".$_GET['id'];          			   

				mysql_query($sql) or die("Error: Data Base query! (Update products)".mysql_error());
		
		break;

		default:
			# code...
		break;
	}
}

?>