<?php

require 'db.php';

$data = array();

if(isset($_GET['files']))
{ 
  $error = false;
  $files = array();
  $uploaddir = '../img/users/';
  foreach($_FILES as $file)
  {
    if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name'])))
    {
      $files[] = $uploaddir .$file['name'];
    }
    else
    {
        $error = true;
    }
  }
  $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
}
else
{
  $usreimg = substr($_POST['filenames'][0], 2);
    $sql = " UPDATE users 
            SET first_name = '".$_POST['name']."', 
              user_img = '".$usreimg."', 
              password = '".$_POST['password']."' ".
            "WHERE user_id = ".$_POST['u_id'];                  

    mysql_query($sql) or die("Error: Data Base query! (Update products)".mysql_error());
    $result = mysql_query('SELECT * FROM users');
     
    $temp = array();

    while($row = mysql_fetch_array($result))
      {
          $temp[] = $row;
      }

    $data = array('users' => $temp);
    echo json_encode($data);
    exit();
}

echo json_encode($data);
