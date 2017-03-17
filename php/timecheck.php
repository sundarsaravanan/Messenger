<?php 
session_start();
if(isset($_SESSION["id"])){
	include_once("dbconnect.php");
  $id=$_SESSION['id'];
  $to=$_GET['to'];
  $sql = "SELECT time_stamp FROM message where  from_id =$to and to_id=$id group by time_stamp desc";
	$query = mysqli_query($dbcon, $sql);
  $row = mysqli_fetch_row($query);
  echo $row[0];
	mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
