<?php

//connect to DB
$db_host = 'localhost'; 
$db_name = 'project'; 
$db_user = 'root'; 
$db_pass = '';

$conn = mysql_connect($db_host, $db_user, $db_pass) or die ('Error: Data Base query! (conn)'.mysql_error());
mysql_select_db($db_name, $conn) or die('Error: Data Base query! (select_db)'.mysql_error()); 
mysql_query('set names utf8', $conn); 
