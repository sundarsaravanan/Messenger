<?php
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $to_id=$_GET['to'];
  $id=$_SESSION['id'];


		$query = "update features set typing=1 where from_id=$id and to_id=$to_id";
			$result = mysqli_query($dbcon, $query)
			or die('Error querying database.');
			mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
?>
