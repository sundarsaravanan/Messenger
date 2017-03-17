<?php
session_start();
if(isset($_SESSION["id"])){
  include_once("dbconnect.php");
  $id=$_SESSION['id'];
  $to=$_POST['to'];
  $last=$_POST['last'];
  $sql = "SELECT to_id FROM features where  from_id=$id and typing=1";
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
}
else {
	header("Location: ../index.html");
}
 ?>
