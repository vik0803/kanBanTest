<?php 

//connect to DB
require 'db.php';

$result = mysql_query('SELECT * FROM projects');
 
$temp = array();

while($row = mysql_fetch_array($result))
{
    $temp[] = $row;
}

$data = array('projects' => $temp);
echo json_encode($data);

if(isset($_GET['action']))
{
	switch ($_GET['action'])
	{
		case 'add':

			//Add records in a customers table
		    $sql = "INSERT INTO projects 
		            (project_name) 
		            VALUES ('".addslashes(trim($_POST['name']))."')";  
		                      
		     mysql_query($sql) or die("Error: Data Base query!(projects)".mysql_error());
		
		break;

		case 'delete':

			//Delete records in a customers table
			$sql = "DELETE FROM projects
					WHERE project_id = ".$_GET['id'];
	
			mysql_query($sql) or die("Error: Data Base query!(Delete products_content)".mysql_error());
		
		break;

		case 'edit':

			//Update records in a customers table
				$sql = " UPDATE projects 
						SET project_name = '".$_POST['name']."' ".
						"WHERE project_id = ".$_GET['id'];          			   

				mysql_query($sql) or die("Error: Data Base query! (Update products)".mysql_error());
		
		break;

		default:
			# code...
		break;
	}
}

