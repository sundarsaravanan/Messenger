<?php
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $id=$_SESSION['id'];
    $sql = "SELECT id,status FROM users where NOT id = $id ";
	$query = mysqli_query($dbcon, $sql);
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
     array_push($userlist,$row[1]);

	}
	echo json_encode($userlist);

}
		mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
