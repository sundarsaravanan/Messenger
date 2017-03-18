<?php
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $id=$_SESSION['id'];
    $sql = "SELECT username,profilepic,status,id FROM users where NOT id = $id ";
    $userlist = array();

	$query = mysqli_query($dbcon, $sql);
	$i=-1;
	while($row = mysqli_fetch_array($query))
	{
	    $i++;
	   array_push($userlist,$row[0]);
     array_push($userlist,$row[1]);
     array_push($userlist,$row[2]);
		 array_push($userlist,$row[3]);
	}
echo json_encode($userlist);

		mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
