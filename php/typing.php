<?php
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $to_id=$_GET['to'];
  $id=$_SESSION['id'];

$status=$_GET['status'];
		$query = "update features set typing=$status where from_id=$id and to_id=$to_id";
			$result = mysqli_query($dbcon, $query)
			or die('Error querying database.');
			mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
?>
