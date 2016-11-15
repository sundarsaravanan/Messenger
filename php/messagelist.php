<?php
session_start();
	include_once("dbconnect.php");
  $id=$_SESSION['id'];
  $to=$_POST['to'];
    $sql = "SELECT from_id,to_id,content FROM message where  from_id in($id,$to) and to_id in($id,$to) ";
    $userlist = array();

	$query = mysqli_query($dbcon, $sql);
	$i=-1;
	while($row = mysqli_fetch_array($query))
	{
	    $i++;
	   array_push($userlist,$row[0]);
     array_push($userlist,$row[1]);
     array_push($userlist,$row[2]);




	}
echo json_encode($userlist);

		mysqli_close($dbcon);
?>
