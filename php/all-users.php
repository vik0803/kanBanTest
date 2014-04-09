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
?>