<?php

require 'db.php';

if (isset($_GET['action'])) {

	switch ($_GET['action']) {
		
		case 'deleteticket':

			mysql_query("DELETE FROM tickets
			WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (ticket_position='2')");
	 
			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'deleteinprogressticket':

			mysql_query("DELETE FROM tickets
			WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (ticket_position='3')");
	 
			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'deletedoneticket':

			mysql_query("DELETE FROM tickets
			WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (ticket_position='4')");
	 
			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'movedashboardticket':

			mysql_query("UPDATE tickets
						SET ticket_position = '".$_GET['tktPstn']."',
							ticket_user_id = '".$_GET['userId']."', 
							queue_date = '".date("d/m/y")."' ".
			"WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			LEFT JOIN users
			ON tickets.ticket_user_id = users.user_id
			WHERE (tickets.project_id = '".addslashes(trim($_GET['projectid']))."' AND ticket_position='3')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'movedinprogressticket':

			mysql_query("UPDATE tickets
						SET ticket_position = '".$_GET['tktPstn']."',
							ticket_user_id = '".$_GET['userId']."', 
							done_date = '".date("d/m/y")."' ".
			"WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			LEFT JOIN users
			ON tickets.ticket_user_id = users.user_id
			WHERE (tickets.project_id = '".addslashes(trim($_GET['projectid']))."' AND ticket_position='3')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'moveticketarchive':

			mysql_query("UPDATE tickets
						SET ticket_position = '".$_GET['tktPstn']."',
							ticket_user_id = '".$_GET['userId']."' 
							WHERE (tickets.ticket_id = '".$_GET['id']."')");

	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			LEFT JOIN users
			ON tickets.ticket_user_id = users.user_id
			WHERE (tickets.project_id = '".addslashes(trim($_GET['projectid']))."' AND ticket_position='4')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

		case 'inprogresstickets':
	 		$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			WHERE (ticket_position='3')");

			$temp = array();

			while($row = mysql_fetch_array($result))
			{
			    $temp[] = $row;
			}

			$data = array('tickets' => $temp);
			echo json_encode($data);
			exit();
		break;

        case 'donetickets':
            $result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			WHERE (ticket_position='4')");

            $temp = array();

            while($row = mysql_fetch_assoc($result))
            {
                $temp[] = $row;
            }

            $data = array('tickets' => $temp);
            echo json_encode($data);
            exit();
        break;

        case 'archivetickets':

        	$pageSize = 10;
        	$pageNumber = $_GET['pageNumber']; 
        	$from = ($pageNumber - 1) * $pageSize;   
			$to = $pageNumber * $pageSize;

			$result = mysql_query("SELECT * FROM tickets 
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			LEFT JOIN users
			ON tickets.ticket_user_id = users.user_id
			WHERE (ticket_position='5') LIMIT 0, $to");

            $result2 = mysql_query("SELECT * FROM tickets 
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			LEFT JOIN app_sectors
			ON tickets.ticket_position = app_sectors.app_sectors_id
			LEFT JOIN users
			ON tickets.ticket_user_id = users.user_id
			WHERE (ticket_position='5')");

            $temp = array();

            while($row = mysql_fetch_assoc($result))
            {
                $temp[] = $row;
            }


            $temp2 = array();
            
            while($row = mysql_fetch_assoc($result2))
            {
                $temp2[] = $row;
            }

            $limit = array('to' => $to, 'size' => count($temp2));
            $data = array('tickets' => $temp,'limit' => $limit);
            echo json_encode($data);
            exit();
        break;
	}
}

$result = mysql_query("SELECT * FROM tickets
			LEFT JOIN ticket_state
			ON tickets.state_id = ticket_state.state_id
			LEFT JOIN projects
			ON tickets.project_id = projects.project_id
			WHERE (ticket_position='2')");
	 
$temp = array();

while($row = mysql_fetch_array($result))
{
    $temp[] = $row;
}

$data = array('tickets' => $temp);
echo json_encode($data);

?>