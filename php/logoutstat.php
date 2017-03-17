<?php
session_start();
if(isset($_SESSION["id"])){
  include_once("dbconnect.php");
  $id=$_SESSION['id'];
  $query ="update users set status=0 where id =$id";
  $result = mysqli_query($dbcon, $query);
  mysqli_close($dbcon);
}
else {
	header("Location: ../index.html");
}
 ?>
