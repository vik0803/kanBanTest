<?php  
	require 'db.php';

	$result = mysql_query('SELECT * FROM ticket_state');
 
	$temp = array();

	while($row = mysql_fetch_array($result))
	{
	    $temp[] = $row;
	}

	$data = array('ticketstate' => $temp);
	echo json_encode($data);
?>