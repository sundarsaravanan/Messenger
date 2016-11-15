<?php
session_start();
	include_once("dbconnect.php");
  $to_id=$_GET['to'];
  $id=$_SESSION['id'];
  echo $to_id;
  echo $id;

		$query = "update features set new_msg=2 where from_id=$id and to_id=$to_id";
echo $query;
  		$result = mysqli_query($dbcon, $query)
			or die('Error querying database.');
			mysqli_close($dbcon);
?>
