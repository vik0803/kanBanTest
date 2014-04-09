<?php 
	require 'db.php';

	if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['description'])) {
		$sql = "INSERT INTO tickets
				(project_id,description, state_id, ticket_date, ticket_position)
				VALUES ('".addslashes(trim($_POST['prjctId']))."', '".addslashes(trim($_POST['description']))."', '".addslashes(trim($_POST['state']))."' , '".date("d/m/y")."' , '".addslashes(trim($_POST['tktPstn']))."')";
		mysql_query($sql) or die("Error: Data Base query!(users)".mysql_error());

		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			WHERE (tickets.project_id = '".addslashes(trim($_POST['prjctId']))."' AND ticket_position='1')");
 
		$temp = array();

		while($row = mysql_fetch_array($result))
		{
		    $temp[] = $row;
		}

		$data = array('tickets' => $temp);
		echo json_encode($data);
		exit();
	} else {
		echo 'description filed is empty';
		exit();
	}
?>