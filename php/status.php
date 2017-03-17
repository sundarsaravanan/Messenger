<?php
session_start();
if(isset($_SESSION["id"])){
  include_once("dbconnect.php");
  $id=$_SESSION['id'];
$status=$_GET['status'];
  $query ="update users set status=$status where id =$id";
  $result = mysqli_query($dbcon, $query) or die(error);
  mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
