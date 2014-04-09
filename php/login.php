<?php 
require 'db.php';

if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['name']) && !empty($_POST['password'])){
	$name = $_POST['name'];
	$password = $_POST['password'];
$result = mysql_query('SELECT COUNT(user_id) AS user FROM users
WHERE username="'.$name.'" AND password="'.$password.'"');
 	
	while($row = mysql_fetch_array($result))
	{
	    $count = $row['user'];
	    
	    if($count == 1){
	    	
	    	// echo '1';
	    	$result = mysql_query('SELECT * FROM users
	    						   WHERE username="'.$name.'"');
			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('users' => $temp);
			echo json_encode($data);
	    }
	    else{
	    	echo '0';	
	    }
	}
}

?>