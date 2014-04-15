<?php  
	require 'db.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$_POST=array_merge($_POST,json_decode(file_get_contents('php://input'),true)); //taka se pra6tat json object i taka se tretirat ot php file-a
	$obj = $_POST['myData'];
	echo $obj['description'];

	$sql = " UPDATE tickets 
			SET description = '".$obj['description']."' ".
			"WHERE ticket_id = ".$obj['id'];          			   

	mysql_query($sql) or die("Error: Data Base query! (Update products)".mysql_error());

}

if(isset($_GET['action'])) 
{
	switch ($_GET['action'])
	{
		case 'getticket':
			$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (tickets.project_id = '".$_GET['id']."' AND ticket_position='1')");
	 
			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
		break;

		case 'deleteticket':

			mysql_query("DELETE FROM tickets
			WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (tickets.project_id = '".$_GET['projectid']."' AND ticket_position='1')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
		break;

		case 'moveticket':

			mysql_query("UPDATE tickets
						SET ticket_position = '".$_GET['tktPstn']."', 
							queue_date = '".date("d/m/y")."' ".
			"WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			WHERE (tickets.project_id = '".addslashes(trim($_GET['projectid']))."' AND ticket_position='1')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
		break;

		case 'morrisinfo':
			$result = mysql_query('SELECT * FROM tickets');
			$temp = array();

			while($row = mysql_fetch_assoc($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
		break;
	}
} 

?>