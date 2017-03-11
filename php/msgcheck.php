<?php
  session_start();
  include_once("dbconnect.php");
  $id=$_SESSION['id'];
  $to=$_POST['to'];
  $last=$_POST['last'];
  $sql = "SELECT content FROM message where  from_id in($to) and to_id in($id) and time_stamp > $last ";
  $query = mysqli_query($dbcon, $sql);
  $userlist = array();
  if($query===false)
  {

  }
  else{
    	$userlist = array();
	$i=-1;
	while($row = mysqli_fetch_array($query))
  	{
	    $i++;
	   array_push($userlist,$row[0]);
  }
	echo json_encode($userlist);
  }
  mysqli_close($dbcon);
?>
